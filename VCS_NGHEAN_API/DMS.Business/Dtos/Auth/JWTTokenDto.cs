using DMS.BUSINESS.Dtos.AD;

namespace DMS.BUSINESS.Dtos.Auth
{
    public class JWTTokenDto
    {
        public string accessToken { get; set; }

        public string refreshToken { get; set; }

        public tblAccountDto accountInfo { get; set; }
    }
}
