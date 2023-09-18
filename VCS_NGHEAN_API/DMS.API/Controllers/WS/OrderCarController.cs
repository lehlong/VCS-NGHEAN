using Microsoft.AspNetCore.Mvc;
using DMS.API.AppCode.Enum;
using DMS.API.AppCode.Extensions;
using DMS.BUSINESS.Common.Class;
using DMS.BUSINESS.Dtos.WS;
using DMS.BUSINESS.Filter.Common;
using DMS.BUSINESS.Services.WS;
using DMS.BUSINESS.Filter.WS;
using DMS.CORE;
using System.Data;
using Microsoft.Data.SqlClient;
using DMS.BUSINESS.Models;

namespace DMS.API.Controllers.WS
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderCarController : ControllerBase
    {
        public readonly IOrderCarService _service;
        public readonly AppDbContext _context;
        public OrderCarController(IOrderCarService service, AppDbContext context)
        {
            _service = service;
            _context = context;
        }

        [HttpGet("Search")]
        public async Task<IActionResult> Search([FromQuery] BaseFilter filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.Search(filter);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0001", _service);
            }
            return Ok(transferObject);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll([FromQuery] OrderCarFilterLite filter)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetAll(filter);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0001", _service);
            }
            return Ok(transferObject);
        }

        [HttpPost("Insert")]
        public async Task<IActionResult> Insert([FromBody] tblOrderCarDto OrderCar)
        {
            var transferObject = new TransferObject();
            OrderCar.Id = Guid.NewGuid();
            var result = await _service.Add(OrderCar);
            if (_service.Status)
            {
                transferObject.Data = result;
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0100", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0101", _service);
            }
            return Ok(transferObject);
        }

        [HttpPut("Update")]
        public async Task<IActionResult> Update([FromBody] tblOrderCarDto OrderCar)
        {
            var transferObject = new TransferObject();
            await _service.Update(OrderCar);
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

        [HttpDelete("Delete/{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var transferObject = new TransferObject();
            await _service.Delete(id);
            if (_service.Status)
            {
                transferObject.Status = true;
                transferObject.MessageObject.MessageType = MessageType.Success;
                transferObject.GetMessage("0105", _service);
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0106", _service);
            }
            return Ok(transferObject);
        }

        [HttpGet("GetDetail")]
        public async Task<IActionResult> GetDetail([FromQuery] string code)
        {
            var transferObject = new TransferObject();
            var result = await _service.GetById(code);
            if (_service.Status)
            {
                transferObject.Data = result;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0001", _service);
            }
            return Ok(transferObject);
        }

        [HttpPost("CheckTicket")]
        public async Task<IActionResult> CheckTicket([FromBody] tblOrderCarDto OrderCar)
        {
            var transferObject = new TransferObject();
            try
            {
                var area = await _context.tblMdArea.FindAsync(OrderCar.AreaCode);
                DataSet data = new DataSet();
                string query = area.Code == "KHO-BT" ? $"EXEC [dbo].[VCS_Check_Ticket_BenThuy] '{OrderCar.Vehicle}','{OrderCar.TimeCheckIn}'" : $"EXEC [dbo].[VCS_Check_Ticket_NghiHuong] '{OrderCar.Vehicle}','{OrderCar.TimeCheckIn}'";
                var check = "";
                using (SqlConnection con = new SqlConnection(area?.DbSmo))
                {
                    SqlCommand cmd = new SqlCommand(query, con);
                    cmd.CommandType = CommandType.Text;
                    SqlDataAdapter adapter = new SqlDataAdapter(cmd);
                    adapter.Fill(data);

                    check = data.Tables[0].Rows[0][0].ToString();
                }
            }
            catch (Exception ex)
            {
                transferObject.MessageObject.MessageDetail = ex.Message;
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0101", _service);
            }
            
            return Ok(transferObject);
        }
    }
}
