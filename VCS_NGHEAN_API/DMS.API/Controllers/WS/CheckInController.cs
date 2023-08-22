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
    public class CheckInController : ControllerBase
    {
        public readonly ICheckInService _service;
        public readonly AppDbContext _context;
        public CheckInController(ICheckInService service, AppDbContext context)
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
        public async Task<IActionResult> GetAll([FromQuery] CheckInFilterLite filter)
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
        public async Task<IActionResult> Insert([FromBody] tblCheckInDto CheckIn)
        {
            var transferObject = new TransferObject();
            CheckIn.Id = Guid.NewGuid();
            CheckIn.TimeCheckIn = DateTime.Now;
            var result = await _service.Add(CheckIn);
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
        public async Task<IActionResult> Update([FromBody] tblCheckInDto CheckIn)
        {
            var transferObject = new TransferObject();
            await _service.Update(CheckIn);
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

        [HttpDelete("Delete/{code}")]
        public async Task<IActionResult> Delete([FromRoute] string code)
        {
            var transferObject = new TransferObject();
            await _service.Delete(code);
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

        [HttpGet("CaptureImage/{username}")]
        public async Task<IActionResult> CaptureImage([FromRoute] string username)
        {
            var transferObject = new TransferObject();
            //var result = null;
            var pathImage = await _service.CaptureImage(username);
            if (_service.Status)
            {
                transferObject.Data = pathImage;
            }
            else
            {
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0001", _service);
            }
            return Ok(transferObject);
        }

        [HttpGet("GetListOrderSmo/{areaCode}")]
        public async Task<IActionResult> GetListOrderSmo([FromRoute] string areaCode)
        {
            var transferObject = new TransferObject();
            var area = await _context.tblMdArea.FindAsync(areaCode);
            DataSet data1 = new DataSet();
            string query1 = $"SELECT [OicPBatch], [OicPtrip], [VehicleCode], [DoSAP], [Create_Date] FROM [SMO_PRODUCT_NGHEAN].[dbo].[PO_Header] WHERE Status = 're' AND SupplyPlant = '{area?.SupplyPlantSmo}' AND Create_Date < '{DateTime.Now}' AND Create_Date > '{DateTime.Now.AddMonths(-1)}'";
            DataSet data2 = new DataSet();
            string query2 = $"SELECT [OicPBatch], [OicPtrip], [VehicleCode], [DoSAP], [CreateDate] FROM [SMO_PRODUCT_NGHEAN].[dbo].[SO_CU_Header] WHERE Status = 're' AND Plant = '{area?.SupplyPlantSmo}' AND CreateDate < '{DateTime.Now}' AND CreateDate > '{DateTime.Now.AddMonths(-1)}'";

            try
            {
                using (SqlConnection con = new SqlConnection(area?.DbSmo))
                {
                    SqlCommand cmd = new SqlCommand(query1, con);
                    cmd.CommandType = CommandType.Text;
                    SqlDataAdapter adapter1 = new SqlDataAdapter(cmd);
                    adapter1.Fill(data1);

                    SqlCommand cmd2 = new SqlCommand(query2, con);
                    cmd2.CommandType = CommandType.Text;
                    SqlDataAdapter adapter2 = new SqlDataAdapter(cmd2);
                    adapter2.Fill(data2);

                    var lstOrder1 = data1.Tables[0].AsEnumerable()
                        .Select(dataRow => new ListOrderSmoModel
                        {
                            DoSap = dataRow.Field<string>("DoSap"),
                            Time = dataRow.Field<DateTime>("Create_Date"),
                            Vehicle = dataRow.Field<string>("VehicleCode"),
                            Driver = dataRow.Field<string>("OicPtrip") + " " + dataRow.Field<string>("OicPBatch"),
                        }).ToList();
                    var lstOrder2 = data2.Tables[0].AsEnumerable()
                        .Select(dataRow => new ListOrderSmoModel
                        {
                            DoSap = dataRow.Field<string>("DoSap"),
                            Time = dataRow.Field<DateTime>("CreateDate"),
                            Vehicle = dataRow.Field<string>("VehicleCode"),
                            Driver = dataRow.Field<string>("OicPtrip") + " " + dataRow.Field<string>("OicPBatch"),
                        }).ToList().Union(lstOrder1).OrderByDescending(x => x.Time);

                    transferObject.Data = lstOrder2;

                }
            }
            catch (Exception ex)
            {
                transferObject.MessageObject.MessageDetail = ex.Message;
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0001", _service);
            }

            return Ok(transferObject);
        }

        [HttpGet("ResetCamera")]
        public IActionResult ResetCamera()
        {
            var transferObject = new TransferObject();
            
            try
            {
                System.Diagnostics.Process.Start("D:\\D2S Project Github\\VCS-NGHEAN\\StreamCaremaServer\\app.bat");
            }
            catch (Exception ex)
            {
                transferObject.MessageObject.MessageDetail = ex.Message;
                transferObject.Status = false;
                transferObject.MessageObject.MessageType = MessageType.Error;
                transferObject.GetMessage("0001", _service);
            }

            return Ok(transferObject);
        }
    }
}
