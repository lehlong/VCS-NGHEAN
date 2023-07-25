using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.MD;
using DMS.CORE;
using DMS.CORE.Entities.MD;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.MD
{
    public interface IPartnerService : IGenericService<tblMdPartner, tblPartnerDto>
    {
        Task<PagedResponseDto> Search(PartnerFilter filter);
        Task<IList<tblPartnerDto>> GetAll(PartnerFilterLite filter);
    }
    public class PartnerService : GenericService<tblMdPartner, tblPartnerDto>, IPartnerService
    {
        public PartnerService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(PartnerFilter filter)
        {
            var query = this._dbContext.tblMdPartner.AsQueryable();
            if (!string.IsNullOrWhiteSpace(filter.KeyWord))
            {
                query = query.Where(x =>
                    x.Code.Contains(filter.KeyWord) ||
                    x.Name.Contains(filter.KeyWord) ||
                    x.Address.Contains(filter.KeyWord) ||
                    x.PhoneNumber.Contains(filter.KeyWord) ||
                    x.Email.Contains(filter.KeyWord)
                );
            }
            if (filter.IsActive.HasValue)
            {
                query = query.Where(x => x.IsActive == filter.IsActive);
            }
            if (filter.IsCustomer.HasValue)
            {
                query = query.Where(x => x.IsCustomer == filter.IsCustomer);
            }
            if (filter.IsProvider.HasValue)
            {
                query = query.Where(x => x.IsProvider == filter.IsProvider);
            }
            query = query.OrderBy(x => x.Code);
            return await this.Paging(query, filter);

        }

        public async Task<IList<tblPartnerDto>> GetAll(PartnerFilterLite filter)
        {
            var query = this._dbContext.tblMdPartner.AsQueryable();

            if (filter.IsActive.HasValue)
            {
                query = query.Where(x => x.IsActive == filter.IsActive);
            }
            if (filter.IsCustomer.HasValue)
            {
                query = query.Where(x => x.IsCustomer == filter.IsCustomer);
            }
            if (filter.IsProvider.HasValue)
            {
                query = query.Where(x => x.IsProvider == filter.IsProvider);
            }
            query = query.OrderBy(x => x.Code);

            return _mapper.Map<IList<tblPartnerDto>>(await query.ToListAsync());

        }
    }
}
