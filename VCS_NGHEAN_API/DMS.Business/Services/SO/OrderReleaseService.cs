using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Constants;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.SO;
using DMS.BUSINESS.Dtos.SO.OrderProcess;
using DMS.BUSINESS.Dtos.SO.OrderRelease;
using DMS.BUSINESS.Dtos.SO.OrderReleaseProcess;
using DMS.BUSINESS.Dtos.SO.OrderScale;
using DMS.CORE;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.SO
{
    public interface IOrderReleaseService : IGenericService<tblSoOrderRelease, tblOrderReleaseDto>
    {
        Task UpdateStep(IDto dto);
    }

    public class OrderReleaseService : GenericService<tblSoOrderRelease, tblOrderReleaseDto>, IOrderReleaseService
    {
        public OrderReleaseService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<tblOrderReleaseDto> Add(IDto dto)
        {
            try
            {
                await _dbContext.Database.BeginTransactionAsync();

                var obj = _mapper.Map<tblSoOrderRelease>(dto);

                obj.Code = string.Concat(Cnst.OrderReleasePrefix, DateTime.Now.ToString("ddMMyy"), "-", CountNumberOrder.CurrentNumberRelease);

                var result = await _dbContext.AddAsync(obj);
                await _dbContext.SaveChangesAsync();
                if (!this.Status)
                {
                    await _dbContext.Database.RollbackTransactionAsync();
                    return null;
                }

                await UpdateOrderStep(obj.OrderCode);
                await CreateOrderScale(obj.OrderCode,obj.Code);

                var process = new tblOrderReleaseProcessCreateDto()
                {
                    ActionCode = OrderReleaseAction.TAO_MOI.ToString(),
                    OrderReleaseCode = obj.Code,
                    PrevState = string.Empty,
                    State = OrderReleaseState.KHOI_TAO.ToString(),
                };

                var processObj = _mapper.Map<tblSoOrderReleaseProcess>(process);
                await _dbContext.AddAsync(processObj);
                await _dbContext.SaveChangesAsync();
                await _dbContext.Database.CommitTransactionAsync();
                CountNumberOrder.CurrentNumberRelease++;
                return _mapper.Map<tblOrderReleaseDto>(obj);
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
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
                var model = dto as tblOrderReleaseUpdateStepDto;
                var currentObj = await _dbContext.tblSoOrderRelease.FirstOrDefaultAsync(x => x.Code == model.Code);
                var stateParse = Enum.TryParse(model.State, out OrderReleaseState result);
                if (!stateParse)
                {
                    this.Status = false;
                    this.MessageObject = new Common.Class.MessageObject()
                    {
                        Code = "0000",
                    };
                    return;
                }

                if (currentObj.State == OrderReleaseState.DA_HOAN_THANH.ToString() || currentObj.State == OrderReleaseState.DA_BI_HUY.ToString())
                {
                    this.Status = false;
                    this.MessageObject = new Common.Class.MessageObject()
                    {
                        Code = "2000",
                    };
                }

                _dbContext.ChangeTracker.Clear();
                await base.Update(dto);
                if (this.Status)
                {
                    await AddProcess(currentObj.State, model.Code, result);
                }
                await _dbContext.Database.CommitTransactionAsync();
            }
            catch (Exception ex)
            {
                await _dbContext.Database.RollbackTransactionAsync();
                this.Status = false;
                this.Exception = ex;
            }
        }

        private async Task AddProcess(string oldState, string orderReleaseCode, OrderReleaseState? newState = null, string action = null)
        {
            string prevState = oldState;
            string state;
            switch (newState)
            {
                case OrderReleaseState.DA_HOAN_THANH:
                    action = OrderReleaseAction.HOAN_THANH.ToString();
                    state = OrderReleaseState.DA_HOAN_THANH.ToString();
                    break;
                case OrderReleaseState.DA_BI_HUY:
                    action = OrderReleaseAction.HUY.ToString();
                    state = OrderReleaseState.DA_BI_HUY.ToString();
                    break;
                default:
                    action = action ?? string.Empty;
                    state = oldState;
                    break;
            }

            var process = new tblOrderReleaseProcessCreateDto()
            {
                ActionCode = action,
                OrderReleaseCode = orderReleaseCode,
                PrevState = prevState,
                State = state,
            };

            var processObj = _mapper.Map<tblSoOrderReleaseProcess>(process);
            await _dbContext.AddAsync(processObj);
            await _dbContext.SaveChangesAsync();
        }

        public override async Task Update(IDto dto)
        {
            try
            {
                var model = dto as tblOrderReleaseUpdateDto;
                await _dbContext.Database.BeginTransactionAsync();
                var currentObj = await _dbContext.tblSoOrderRelease.FirstOrDefaultAsync(x => x.Code == model.Code);
                if (!string.IsNullOrWhiteSpace(model.State))
                {
                    var stateParse = Enum.TryParse(model.State, out OrderReleaseState result);
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

                    _dbContext.ChangeTracker.Clear();
                    await base.Update(model);

                    if (!this.Status)
                    {
                        await _dbContext.Database.RollbackTransactionAsync();
                        return;
                    }

                    await AddProcess(currentObj.State, model.Code, result);
                    await _dbContext.Database.CommitTransactionAsync();
                    return;
                }

                await base.Update(model);
                if (this.Status)
                {
                    await AddProcess(currentObj.State, model.Code, action: OrderReleaseAction.CHINH_SUA.ToString());
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

        private async Task UpdateOrderStep(string code)
        {
            try
            {
                var currentObj = await _dbContext.tblSoOrder.FirstOrDefaultAsync(x => x.Code == code);

                if (currentObj == null)
                {
                    this.Status = false;
                    this.MessageObject = new() { Code = "0003" };
                    return;
                }

                if (currentObj.State == OrderState.DA_HOAN_THANH.ToString() || currentObj.State == OrderState.DA_BI_HUY.ToString())
                {
                    this.Status = false;
                    this.MessageObject = new Common.Class.MessageObject()
                    {
                        Code = "2000",
                    };
                    return;
                }

                var oldState = currentObj.State;
                if (oldState != OrderState.DANG_LAY_HANG.ToString())
                {
                    currentObj.State = OrderState.DANG_LAY_HANG.ToString();
                }

                _dbContext.ChangeTracker.Clear();
                _dbContext.tblSoOrder.Update(currentObj);

                await AddOrderProcess(oldState, code, OrderState.DANG_LAY_HANG);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        private async Task AddOrderProcess(string oldState, string orderCode, OrderState? newState = null, string action = null)
        {
            var process = new tblOrderProcessCreateDto()
            {
                ActionCode = action,
                OrderCode = orderCode,
                PrevState = oldState,
                State = newState.ToString(),
            };

            var processObj = _mapper.Map<tblSoOrderProcess>(process);
            await _dbContext.AddAsync(processObj);
            await _dbContext.SaveChangesAsync();
        }

        private async Task CreateOrderScale(string orderCode,string orderReleaseCode)
        {
            var order = await _dbContext.tblSoOrder
                .Include(x => x.Partner)
                .Include(x => x.OrderDetails).ThenInclude(x => x.Item)
                .Include(x => x.OrderReleases).ThenInclude(x=>x.Vehicle)
                .FirstOrDefaultAsync(x => x.Code == orderCode);

            var scale = new tblOrderScaleDto()
            {
                OrderCode = orderCode,
                CustomerAddress = order?.Partner?.Address,
                CustomerCode = order?.Partner?.Code,
                CustomerName = order?.Partner?.Name,
                CustomerPhone = order?.Partner?.PhoneNumber,
                ItemCode = order?.OrderDetails?.FirstOrDefault(x => x.IsMainItem ?? false)?.ItemCode,
                ItemName = order?.OrderDetails?.FirstOrDefault(x => x.IsMainItem ?? false)?.Item?.Name,
                VehicleCode = order?.OrderReleases?.FirstOrDefault()?.MixVehicleCode,
                ItemProportion = order?.OrderDetails?.FirstOrDefault(x => x.IsMainItem ?? false)?.Item?.Proportion,
                ItemPercentageOfImpurities = order?.OrderDetails?.FirstOrDefault(x => x.IsMainItem ?? false)?.Item?.PercentageOfImpurities,
                OrderReleaseCode = orderReleaseCode,
                ItemPrice = order?.OrderDetails?.FirstOrDefault(x => x.IsMainItem ?? false)?.Item?.SellPrice,
            };

            _dbContext.ChangeTracker.Clear();
            _dbContext.tblSoScale.Add(_mapper.Map<tblSoScale>(scale));
            await _dbContext.SaveChangesAsync();
        }
    }
}
