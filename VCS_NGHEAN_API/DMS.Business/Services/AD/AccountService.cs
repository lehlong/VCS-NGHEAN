using AutoMapper;
using Microsoft.EntityFrameworkCore;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Util;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.AD;
using DMS.CORE;
using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Services.AD
{
    public interface IAccountService : IGenericService<tblAdAccount, tblAccountDto>
    {
        Task<PagedResponseDto> Search(AccountFilter filter);
        Task UpdateInformation(tblAccountUpdateDto dto);
    }

    public class AccountService : GenericService<tblAdAccount, tblAccountDto>, IAccountService
    {
        public AccountService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(AccountFilter filter)
        {
            try
            {
                var query = this._dbContext.tblAdAccount.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.UserName.Contains(filter.KeyWord) ||
                        x.FullName.Contains(filter.KeyWord)
                    );
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                if (filter.GroupId.HasValue)
                {
                    query = query.Where(x => x.GroupId == filter.GroupId);
                }
                query = query.Include(x => x.AccountGroup).OrderBy(x => x.UserName).Include(x => x.AccountType).Include(x => x.Area);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public override async Task<tblAccountDto> Add(IDto dto)
        {
            var realDto = dto as tblAccountCreateDto;
            realDto.Password = Utils.CryptographyMD5($"{realDto.UserName}@123");
            return await base.Add(dto);
        }

        public async Task UpdateInformation(tblAccountUpdateDto dto)
        {
             await base.Update(dto);
        }
    }
}
