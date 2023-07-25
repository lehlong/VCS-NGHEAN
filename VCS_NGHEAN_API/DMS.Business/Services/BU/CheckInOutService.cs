using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Services.BU
{
    public interface ICheckInOutService : IGenericService<tblBuCheckInOut, tblCheckInOutDto>
    {
        Task<PagedResponseDto> Search(CheckInOutFilter filter);
    }
    public class CheckInOutService : GenericService<tblBuCheckInOut, tblCheckInOutDto>, ICheckInOutService
    {
        public CheckInOutService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(CheckInOutFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuCheckInOut.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Vehicle.Contains(filter.KeyWord) ||
                        x.CheckInConfirm.Contains(filter.KeyWord) ||
                        x.CheckInNote.Contains(filter.KeyWord) ||
                        x.CheckOutConfirm.Contains(filter.KeyWord) ||
                        x.CheckOutNote.Contains(filter.KeyWord)
                    );
                }
                query = query.OrderBy(x => x.Id);
                return await Paging(query, filter);
            }
            catch (Exception ex)
            {
                Status = false;
                Exception = ex;
                return null;
            }
        }
    }
}
