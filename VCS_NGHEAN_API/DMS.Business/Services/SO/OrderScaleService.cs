using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.SO.OrderScale;
using DMS.BUSINESS.Filter.Common;
using DMS.CORE;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.SO
{
    public interface IOrderScaleService : IGenericService<tblSoScale, tblOrderScaleDto>
    {
        Task<PagedResponseDto> Search(OrderScaleFilter filter);
        Task<tblOrderScaleDto> GetById(Guid Id);
    }
    public class OrderScaleService : GenericService<tblSoScale, tblOrderScaleDto>, IOrderScaleService
    {
        public OrderScaleService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public Task<PagedResponseDto> Search(OrderScaleFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoScale
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                            || x.OrderCode.Contains(filter.KeyWord) || x.OrderReleaseCode.Contains(filter.KeyWord))
                .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
                .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                .OrderByDescending(x => x.CreateDate);

                return base.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<tblOrderScaleDto> GetById(Guid Id)
        {
            try
            {
                var data = await _dbContext.tblSoScale
                .FirstOrDefaultAsync(x => x.Id == Id);

                return _mapper.Map<tblOrderScaleDto>(data);

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
