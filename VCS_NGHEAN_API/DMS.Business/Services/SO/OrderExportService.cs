using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.SO.OrderExport;
using DMS.BUSINESS.Filter.Common;
using DMS.CORE;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.SO
{
    public interface IOrderExportService : IGenericService<tblSoExport, tblOrderExportDto>
    {
        Task<tblOrderExportDto> GetById(string code);
        Task<PagedResponseDto> Search(OrderExportFilter filter);
    }

    public class OrderExportService : GenericService<tblSoExport, tblOrderExportDto>, IOrderExportService
    {
        public OrderExportService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public Task<PagedResponseDto> Search(OrderExportFilter filter)
        {
            try
            {
                var query = _dbContext.tblSoExport.Include(x => x.ExportDetails)
                    .Include(x=>x.Order)
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord)
                            || x.Code.Contains(filter.KeyWord))
                .Where(x => filter.FromDate == null || x.CreateDate.Value.Date >= filter.FromDate.Value.Date)
                .Where(x => filter.ToDate == null || x.CreateDate.Value.Date <= filter.ToDate.Value.Date)
                .Where(x => filter.States == null || !filter.States.Any() || filter.States.Select(y => y.ToLower()).Contains(x.State.ToLower()))
                .Where(x => string.IsNullOrWhiteSpace(filter.PartnerCode) || x.PartnerCode == filter.PartnerCode)
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

        public async Task<tblOrderExportDto> GetById(string code)
        {
            try
            {
                var data = await _dbContext.tblSoExport.Include(x => x.ExportDetails).Include(x=>x.Order)
                .FirstOrDefaultAsync(x => x.Code == code);

                return _mapper.Map<tblOrderExportDto>(data);

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
