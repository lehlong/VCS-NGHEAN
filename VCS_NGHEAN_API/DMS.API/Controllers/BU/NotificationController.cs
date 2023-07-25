using Microsoft.AspNetCore.Mvc;
using DMS.BUSINESS.Services.BU.Notìication;
using DMS.API.AppCode.Enum;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Filter.Common;
using DMS.API.AppCode.Extensions;
using DMS.API.Request;

namespace DMS.API.Controllers.MD
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : BaseController
    {
        private readonly INotificationService _service;

        public NotificationController(IHttpContextAccessor contextAccessor, INotificationService service) : base(contextAccessor)
        {
            _service = service;
        }

        [HttpGet("GetDetail")]
        public async Task<IActionResult> GetDetail([FromQuery] int Id)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetById(Id,UserName);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] BaseFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Search(filter,UserName);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("2000", _service);
            }
            return Ok(transferObject);
        }

        [HttpPut("Seen")]
        public async Task<IActionResult> Seen([FromBody] NotificationRequest request)
        {
            var transferObject = new TransferObject();
            await _service.Seen(request.Id,UserName);
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

        [HttpDelete("Delete")]
        public async Task<IActionResult> Delete([FromBody] NotificationRequest request)
        {
            var transferObject = new TransferObject();
            await _service.Delete(request.Id, UserName);
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
    }
}
