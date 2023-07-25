using Microsoft.AspNetCore.Mvc;

namespace DMS.API.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly IHttpContextAccessor _contextAccessor;

        public BaseController(IHttpContextAccessor contextAccessor)
        {
            _contextAccessor = contextAccessor;
        }

        protected string UserName
        {
            get
            {
                try
                {
                    return _contextAccessor.HttpContext.User.Claims.FirstOrDefault(x => x.Type == "username").Value;
                }
                catch (Exception)
                {
                    return string.Empty;
                }
            }
        }
    }
}
