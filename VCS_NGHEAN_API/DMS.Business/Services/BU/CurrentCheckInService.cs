using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Services.BU
{
    public interface ICurrentCheckInService : IGenericService<tblBuCurrentCheckIn, tblCurrentCheckInDto>
    {
        Task<PagedResponseDto> Search(CurrentCheckInFilter filter);
    }
    public class CurrentCheckInService : GenericService<tblBuCurrentCheckIn, tblCurrentCheckInDto>, ICurrentCheckInService
    {
        public CurrentCheckInService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(CurrentCheckInFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuCurrentCheckIn.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Vehicle.Contains(filter.KeyWord) ||
                        x.CheckInConfirm.Contains(filter.KeyWord) ||
                        x.CheckInNote.Contains(filter.KeyWord)
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
