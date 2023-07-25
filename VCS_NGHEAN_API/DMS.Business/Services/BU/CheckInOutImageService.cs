using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Services.BU
{
    public interface ICheckInOutImageService : IGenericService<tblBuCheckInOutImage, tblCheckInOutImageDto>
    {
        Task<PagedResponseDto> Search(CheckInOutImageFilter filter);
    }
    public class CheckInOutImageService : GenericService<tblBuCheckInOutImage, tblCheckInOutImageDto>, ICheckInOutImageService
    {
        public CheckInOutImageService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(CheckInOutImageFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuCheckInOutImage.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Type.Contains(filter.KeyWord)
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
