using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using DMS.BUSINESS.Dtos.Auth;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Services.Auth;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;

namespace DMS.API.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public readonly IAuthService _service;
        public IConfiguration _configuration { get; set; }
        public AuthController(IAuthService service, IConfiguration configuration)
        {
            _service = service;
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginInfo)
        {
            var transferObject = new TransferObject();
            var account = await _service.CheckLogin(loginInfo);
            if (_service.Status)
            {
                var token = this.GenJwtToken(loginInfo.UserName);
                var jwtTokenDto = new JWTTokenDto()
                {
                    accessToken = token,
                    accountInfo = account
                };
                transferObject.Data = jwtTokenDto;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("1000", _service);
            }
            return Ok(transferObject);
        }

        [HttpPost("validate-token")]
        public async Task<IActionResult> ValidateToken([FromBody] string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));

            try
            {
                var claimsPrincipal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = true,
                    ValidIssuer = _configuration["Jwt:Issuer"],
                    ValidateAudience = true,
                    ValidAudience = _configuration["Jwt:Audience"],
                    ClockSkew = TimeSpan.Zero,
                }, out _);

                JwtSecurityToken jwtToken = tokenHandler.ReadJwtToken(token);

                DateTimeOffset expiresAt = jwtToken.ValidTo;

                var username = claimsPrincipal.Identity.Name;

                var user = await _service.GetAccount(username);

                return Ok(new { user, expiresAt });
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPut("ChangePassword")]
        public async Task<IActionResult> Update([FromBody] ChangePasswordDto accountGroup)
        {
            var transferObject = new TransferObject();
            await _service.ChangePassword(accountGroup);

            if (_service.Status)
            {
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0103", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0104", _service);
            }
            return Ok(transferObject);
        }

        /// <summary>
        /// Tạo token JWT
        /// </summary>
        /// <param name="userName"></param>
        /// <returns></returns>
        private string GenJwtToken(string userName)
        {
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim(ClaimTypes.Name, userName)
                    };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: signIn);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
