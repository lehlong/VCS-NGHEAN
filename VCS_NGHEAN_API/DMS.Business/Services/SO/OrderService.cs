using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Constants;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.SO;
using DMS.BUSINESS.Dtos.AD;
using DMS.BUSINESS.Dtos.BU.Notification;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.BUSINESS.Dtos.SO.OrderExport;
using DMS.BUSINESS.Dtos.SO.OrderProcess;
using DMS.BUSINESS.Filter.SO;
using DMS.BUSINESS.Services.BU.Notìication;
using DMS.CORE;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RabbitMQ.Client;

namespace DMS.BUSINESS.Services.SO
{
    public interface IOrderService : IGenericService<tblSoOrder, tblOrderDto>
    {
        Task<List<tblOrderDto>> Add(tblOrderCreateDto dto);
        Task<PagedResponseDto> Search(OrderFilter filter);
        Task UpdateStep(IDto dto);
        Task DebtClose(DebtCloseDto model);
        Task Confirm(tblOrderConfirmDto model);
    }
    public class OrderService : GenericService<tblSoOrder, tblOrderDto>, IOrderService
    {
        public OrderService(AppDbContext dbContext, IMapper mapper, IConfiguration configuration, IConnection connection) : base(dbContext, mapper)
        {
            if (connection != null)
                NotificationManager.Setup(connection, dbContext, mapper, configuration);
        }

        public async Task<PagedResponseDto> Search(OrderFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoOrder.Include(x => x.Partner)
                    .Include(x => x.OrderDetails)
                    .ThenInclude(x => x.Item)
                    .ThenInclude(x => x.ItemFormula)
                    .Include(x => x.OrderReleases).ThenInclude(x => x.Mixer)
                    .Include(x => x.OrderProcesses)
                    .Include(x => x.Mixer)
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                            || x.Code.Contains(filter.KeyWord))
                .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
                .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                .Where(x => filter.States == null || !filter.States.Any() || filter.States.Select(y => y.ToLower()).Contains(x.State.ToLower()))
                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode) || x.PartnerCode == filter.PartnerCode)
                .Where(x => string.IsNullOrWhiteSpace(filter.ItemCode) || x.OrderDetails.Any(x => x.ItemCode == filter.ItemCode))
                .OrderByDescending(x => x.CreateDate);

                return await Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<List<tblOrderDto>> Add(tblOrderCreateDto dto)
        {
            var currentCode = CountNumberOrder.CurrentNumberOrder;
            try
            {
                var items = await _dbContext.tblMdItem.ToListAsync();
                var listAddObj = new List<tblSoOrder>();
                foreach (var item in dto.PourDate)
                {
                    var obj = _mapper.Map<tblSoOrder>(dto);
                    obj.Code = string.Concat(Cnst.OrderCodePrefix, DateTime.Now.ToString("ddMMyy"), "-", CountNumberOrder.CurrentNumberOrder);
                    obj.PourDate = item;
                    foreach (var detail in obj.OrderDetails)
                    {
                        detail.Price = items.FirstOrDefault(x => x.Code == detail.ItemCode)?.SellPrice;
                    }
                    listAddObj.Add(obj);
                    CountNumberOrder.CurrentNumberOrder++;
                }
                await _dbContext.Database.BeginTransactionAsync();

                await _dbContext.AddRangeAsync(listAddObj);

                foreach (var item in listAddObj)
                {
                    var process = new tblOrderProcessCreateDto()
                    {
                        ActionCode = OrderAction.TAO_MOI.ToString(),
                        OrderCode = item.Code,
                        PrevState = string.Empty,
                        State = OrderState.CHUA_XAC_NHAN.ToString(),
                    };

                    var processObj = _mapper.Map<tblSoOrderProcess>(process);
                    await _dbContext.AddAsync(processObj);
                }

                await _dbContext.SaveChangesAsync();

                await SendNotification(listAddObj, NotificationType.TAO_DON);

                await _dbContext.Database.CommitTransactionAsync();


                return _mapper.Map<List<tblSoOrder>, List<tblOrderDto>>(listAddObj);
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                CountNumberOrder.CurrentNumberOrder = currentCode;
                this.Status = false;
                this.Exception = ex;
                return null;
            }

        }

        public override async Task<tblOrderDto> GetById(object id)
        {
            try
            {
                var entity = await this._dbContext.tblSoOrder
                    .Include(x => x.OrderDetails)
                    .ThenInclude(x => x.Item)
                    .ThenInclude(x => x.ItemFormula)
                    .Include(x => x.OrderProcesses)
                    .Include(x => x.OrderReleases).ThenInclude(x => x.Mixer)
                    .Include(x => x.Partner)
                    .Include(x => x.OrderProcesses)
                    .Include(x => x.Mixer)
                    .FirstOrDefaultAsync(x => x.Code == id.ToString());
                return _mapper.Map<tblOrderDto>(entity);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task UpdateStep(IDto dto)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();
                var model = dto as tblOrderUpdateStateDto;
                var currentObj = await _dbContext.tblSoOrder.FirstOrDefaultAsync(x => x.Code == model.Code);

                if (currentObj == null)
                {
                    this.Status = false;
                    this.MessageObject = new() { Code = "0003" };
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                var stateParse = Enum.TryParse(model.State, out OrderState result);
                if (!stateParse)
                {
                    this.Status = false;
                    this.MessageObject = new Common.Class.MessageObject()
                    {
                        Code = "0000",
                    };
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                if (currentObj.State == OrderState.DA_HOAN_THANH.ToString() || currentObj.State == OrderState.DA_BI_HUY.ToString())
                {
                    this.Status = false;
                    this.MessageObject = new Common.Class.MessageObject()
                    {
                        Code = "2000",
                    };
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                _dbContext.ChangeTracker.Clear();
                await base.Update(dto);
                if (!this.Status)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }

                await AddProcess(currentObj.State, model.Code, result);

                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        public override async Task Update(IDto dto)
        {
            try
            {
                var model = dto as tblOrderUpdateDto;
                await _dbContext.Database.BeginTransactionAsync();
                var currentObj = await _dbContext.tblSoOrder.Include(x => x.OrderDetails).Include(x => x.Export).Include(x => x.OrderReleases).FirstOrDefaultAsync(x => x.Code == model.Code);
                var stateParse = Enum.TryParse(model.State, out OrderState result);
                _dbContext.ChangeTracker.Clear();
                if (!string.IsNullOrWhiteSpace(model.State) && result != OrderState.DA_CHOT_CONG_NO && model.State != currentObj.State)
                {
                    if (!stateParse)
                    {
                        this.Status = false;
                        this.MessageObject = new Common.Class.MessageObject()
                        {
                            Code = "0000",
                        };
                        await _dbContext.Database.RollbackTransactionAsync();
                        return;
                    }

                    _dbContext.tblSoOrder.Update(_mapper.Map<tblSoOrder>(model));

                    await AddProcess(currentObj.State, model.Code, result);
                    await _dbContext.Database.CommitTransactionAsync();
                    return;
                }

                await base.Update(model);
                if (this.Status)
                {
                    await AddProcess(currentObj.State, model.Code, action: OrderAction.CHINH_SUA.ToString());
                }
                await _dbContext.Database.CommitTransactionAsync();
                return;
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task DebtClose(DebtCloseDto model)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();
                var order = await _dbContext.tblSoOrder.FirstOrDefaultAsync(x => x.Code == model.OrderCode);

                if (order == null)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    this.Status = false;
                    this.MessageObject = new() { Code = "0003" };
                    return;
                }

                order.State = OrderState.DA_CHOT_CONG_NO.ToString();
                _dbContext.Update(order);

                await AddProcess(order.State, order.Code, OrderState.DA_CHOT_CONG_NO);


                if (model.OrderDetails != null && model.OrderDetails.Any())
                {
                    var orderDetails = _mapper.Map<List<tblSoOrderDetail>>(model.OrderDetails);
                    _dbContext.ChangeTracker.Clear();
                    _dbContext.tblSoOrderDetail.UpdateRange(orderDetails);
                }

                var totalReleaseNumber = order?.OrderReleases?.Sum(x => x.MixNumber ?? 0);
                var orderDetail = order?.OrderDetails?.FirstOrDefault(x => x.IsMainItem ?? false);

                if (orderDetail == null)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    this.Status = false;
                    this.MessageObject = new() { Code = "0003" };
                    return;
                }

                orderDetail.ReleaseNumber = totalReleaseNumber ?? 0;
                _dbContext.ChangeTracker.Clear();
                _dbContext.tblSoOrderDetail.Update(orderDetail);

                tblOrderExportDto export = new()
                {
                    Type = OrderExportType.SX.ToString(),
                    ExportDate = model.ExportDate,
                    PartnerCode = order.PartnerCode,
                    State = OrderExportState.TAO_MOI.ToString(),
                    OrderCode = order.Code,
                    Discount = model.DisCount,
                    TaxVat = model.TaxVAT,
                    SumMoney = CountTotalMoney(order.OrderDetails.Sum(x => x.SumMoney) ?? 0, model.DisCount ?? 0, model.TaxVAT ?? 0),
                };

                if (order?.Export == null)
                {
                    export.Code = string.Concat(Cnst.ExportCodePrefix, DateTime.Now.ToString("ddMMyy"), "-", CountNumberOrder.CurrentNumberExport);

                    export.ExportDetails = new List<tblExportDetailDto>();
                    foreach (var item in order.OrderDetails)
                    {
                        export.ExportDetails.Add(new tblExportDetailDto()
                        {
                            ExportCode = export.Code,
                            IsMainItem = item.IsMainItem,
                            ItemCode = item.ItemCode,
                            Number = item.ReleaseNumber ?? 0,
                            OrderNumber = item.OrderNumber,
                            Price = item.Price,
                        });
                    }
                    _dbContext.Add(_mapper.Map<tblSoExport>(export));
                }
                else
                {
                    export.Code = order.ExportCode;
                    foreach (var item in order.OrderDetails)
                    {
                        var detail = export?.ExportDetails?.FirstOrDefault(x => x.ItemCode == item.ItemCode);

                        if (detail != null)
                        {
                            detail.ExportCode = export.Code;
                            detail.Number = item.ReleaseNumber ?? 0;
                            detail.Price = item.Price;
                        }
                        else
                        {
                            export.ExportDetails.Add(new tblExportDetailDto()
                            {
                                ExportCode = export.Code,
                                IsMainItem = item.IsMainItem,
                                ItemCode = item.ItemCode,
                                Number = item.ReleaseNumber ?? 0,
                                Price = item.Price,
                            });
                        }
                    }
                    _dbContext.Update(export);
                }

                await _dbContext.SaveChangesAsync();
                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task Confirm(tblOrderConfirmDto model)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();
                var currentObj = await _dbContext.tblSoOrder.FirstOrDefaultAsync(x => x.Code == model.Code);

                if (currentObj.State != OrderState.CHUA_XAC_NHAN.ToString())
                {
                    this.Status = false;
                    this.MessageObject = new()
                    {
                        Code = "2000"
                    };
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }
                _dbContext.ChangeTracker.Clear();
                await base.Update(model);

                if (!this.Status)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    return;
                }
                await AddProcess(OrderState.CHUA_XAC_NHAN.ToString(), currentObj.Code, OrderState.DA_XAC_NHAN);
                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        private async Task AddProcess(string oldState, string orderCode, OrderState? newState = null, string action = null)
        {
            string prevState = oldState;
            string state;
            switch (newState)
            {
                case OrderState.DA_XAC_NHAN:
                    action = OrderAction.XAC_NHAN.ToString();
                    state = OrderState.DA_XAC_NHAN.ToString();
                    break;
                case OrderState.DANG_LAY_HANG:
                    action = OrderAction.TAO_PHIEU_TRON.ToString();
                    state = OrderState.DANG_LAY_HANG.ToString();
                    break;
                case OrderState.DA_HOAN_THANH:
                    action = OrderAction.HOAN_THANH.ToString();
                    state = OrderState.DA_HOAN_THANH.ToString();
                    break;
                case OrderState.DA_BI_HUY:
                    action = OrderAction.HUY.ToString();
                    state = OrderState.DA_BI_HUY.ToString();
                    break;
                case OrderState.DA_TU_CHOI:
                    action = OrderAction.TU_CHOI.ToString();
                    state = OrderState.DA_TU_CHOI.ToString();
                    break;
                case OrderState.DA_CHOT_CONG_NO:
                    action = OrderAction.CHOT_CONG_NO.ToString();
                    state = OrderState.DA_CHOT_CONG_NO.ToString();
                    break;
                default:
                    action ??= string.Empty;
                    state = oldState;
                    break;
            }

            var process = new tblOrderProcessCreateDto()
            {
                ActionCode = action,
                OrderCode = orderCode,
                PrevState = prevState,
                State = state,
            };

            var processObj = _mapper.Map<tblSoOrderProcess>(process);
            await _dbContext.AddAsync(processObj);
            await _dbContext.SaveChangesAsync();
        }

        private async Task SendNotification(string orderCode, NotificationType type)
        {
            if (NotificationManager.IsConnected)
            {
                var accounts = await _dbContext.tblAdAccountGroup.Include(x => x.ListAccount)
                .Where(x => x.RoleCode == Roles.BAN_DIEU_HANH.ToString() || x.RoleCode == Roles.PHONG_KINH_DOANH.ToString())
                .Select(x => x.ListAccount)
                .ToListAsync();

                var listAccount = _mapper.Map<List<tblAccountDto>>(accounts.SelectMany(x => x));
                var listPortalIds = listAccount.Where(x => !string.IsNullOrWhiteSpace(x.PortalId.ToString())).Select(x => x.PortalId.ToString()).Distinct().ToList();
                var order = await _dbContext.tblSoOrder.Include(x => x.Partner).Include(x => x.Area).Where(x => x.Code == orderCode).FirstOrDefaultAsync();
                SendNotificationInputDto notification = new()
                {
                    PortalId = listPortalIds,
                    MessageParameter = new() { { Cnst.NName, order?.Partner?.Name }, { Cnst.NCode, order.Code }, { Cnst.NArea, order?.Area?.Name } }
                };
                foreach (var account in listAccount.Where(x => x.PortalId != null))
                {
                    await NotificationManager.Send(notification, account, type);
                }
            }
        }

        private double CountTotalMoney(double firstTotal, double discount, double taxVAT)
        {
            return firstTotal - (firstTotal * discount / 100) + (firstTotal * (taxVAT / 100));
        }

        private async Task SendNotification(List<tblSoOrder> listOrder, NotificationType type)
        {
            if (NotificationManager.IsConnected)
            {
                var accounts = await _dbContext.tblAdAccountGroup.Include(x => x.ListAccount)
                .Where(x => x.RoleCode == Roles.BAN_DIEU_HANH.ToString() || x.RoleCode == Roles.PHONG_KINH_DOANH.ToString())
                .Select(x => x.ListAccount)
                .ToListAsync();

                var listAccount = _mapper.Map<List<tblAccountDto>>(accounts.SelectMany(x => x));
                var listPortalIds = listAccount.Where(x => !string.IsNullOrWhiteSpace(x.PortalId.ToString())).Select(x => x.PortalId.ToString()).Distinct().ToList();
                var orders = await _dbContext.tblSoOrder.Include(x => x.Partner).Include(x => x.Area).Where(x => listOrder.Select(y => y.Code).Contains(x.Code)).ToListAsync();
                foreach (var order in orders)
                {
                    SendNotificationInputDto notification = new()
                    {
                        PortalId = listPortalIds,
                        MessageParameter = new() { { Cnst.NName, order?.Partner?.Name }, { Cnst.NCode, order.Code }, { Cnst.NArea, order?.Area?.Name } }
                    };
                    foreach (var account in listAccount.Where(x => x.PortalId != null))
                    {
                        await NotificationManager.Send(notification, account, type);
                    }
                }
            }
        }
    }
}
