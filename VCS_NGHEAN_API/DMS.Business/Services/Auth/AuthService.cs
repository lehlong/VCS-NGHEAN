using AutoMapper;
using Microsoft.EntityFrameworkCore;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.Auth;
using DMS.CORE;
using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Services.Auth
{
    public interface IAuthService : IGenericService<tblAdAccount, tblAccountDto>
    {
        Task<tblAccountDto> CheckLogin(LoginDto loginInfo);
        Task<tblAccountDto> GetAccount(string userName);
        Task ChangePassword(ChangePasswordDto changePasswordDto);
    }

    public class AuthService : GenericService<tblAdAccount, tblAccountDto>, IAuthService
    {
        public AuthService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task ChangePassword(ChangePasswordDto changePasswordDto)
        {
            var account = await AuthenticationProcess(new LoginDto()
            {
                UserName = changePasswordDto.UserName,
                Password = changePasswordDto.OldPassword
            });

            if (this.Status)
            {
                var newPasswordHash = Utils.CryptographyMD5(changePasswordDto.NewPassword);
                account.Password = newPasswordHash;
                _dbContext.Update(account);
                await _dbContext.SaveChangesAsync();
            }

            return;
        }

        public async Task<tblAccountDto> CheckLogin(LoginDto loginInfo)
        {
            try
            {
                var account = await AuthenticationProcess(loginInfo);

                return _mapper.Map<tblAccountDto>(account);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblAccountDto> GetAccount(string userName)
        {
            var account = await _dbContext.tblAdAccount.FirstOrDefaultAsync(
                    x => x.UserName == userName);

            return _mapper.Map<tblAccountDto>(account);
        }

        private async Task<tblAdAccount> AuthenticationProcess(LoginDto loginInfo)
        {
            if (string.IsNullOrWhiteSpace(loginInfo.UserName) || string.IsNullOrWhiteSpace(loginInfo.Password))
            {
                this.Status = false;
                this.MessageObject.Code = "1001"; //Để trống username, mật khẩu
                return null;
            }

            var account = await _dbContext.tblAdAccount.FirstOrDefaultAsync(
                x => x.UserName == loginInfo.UserName &&
                x.Password == Utils.CryptographyMD5(loginInfo.Password));

            if (account == null)
            {
                this.Status = false;
                this.MessageObject.Code = "1002"; //Sai username hoặc mật khẩu
                return null;
            }

            if (!(account?.IsActive ?? true))
            {
                this.Status = false;
                this.MessageObject.Code = "1003"; //Tài khoản bị khóa
                return null;
            }
            return account;
        }
    }
}
