using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.WS;
using DMS.BUSINESS.Filter.Common;
using DMS.BUSINESS.Filter.WS;
using DMS.CORE;
using DMS.CORE.Entities.WS;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace DMS.BUSINESS.Services.WS
{
    public interface IOrderCarService : IGenericService<tblWsOrderCar, tblOrderCarDto>
    {
        Task<IList<tblOrderCarDto>> GetAll(OrderCarFilterLite filter);
    }
    public class OrderCarService : GenericService<tblWsOrderCar, tblOrderCarDto>, IOrderCarService
    {
        public OrderCarService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblWsOrderCar.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Vehicle.Contains(filter.KeyWord)
                    );
                }
                if (!string.IsNullOrWhiteSpace(filter.AreaCode))
                {
                    query = query.Where(x =>
                        x.AreaCode == filter.AreaCode
                    );
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Order);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblOrderCarDto>> GetAll(OrderCarFilterLite filter)
        {
            try
            {
                var query = this._dbContext.tblWsOrderCar.AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Order);
                return _mapper.Map<IList<tblOrderCarDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }
    }
}
