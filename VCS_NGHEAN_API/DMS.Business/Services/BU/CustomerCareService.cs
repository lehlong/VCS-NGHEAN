using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Services.BU
{
    public interface ICustomerCareService : IGenericService<tblBuCustomerCare, tblCustomerCareDto>
    {
        Task<PagedResponseDto> Search(CustomerCareFilter filter);
    }
    public class CustomerCareService : GenericService<tblBuCustomerCare, tblCustomerCareDto>, ICustomerCareService
    {
        public CustomerCareService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(CustomerCareFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuCustomerCare.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.OrderCode.Contains(filter.KeyWord) ||
                        x.CareContent.Contains(filter.KeyWord)
                    );
                }
                if (!string.IsNullOrWhiteSpace(filter.PartnerCode))
                {
                    query = query.Where(x => x.PartnerCode.Contains(filter.PartnerCode));
                }
                query = query.OrderBy(x => x.OrderCode);
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
