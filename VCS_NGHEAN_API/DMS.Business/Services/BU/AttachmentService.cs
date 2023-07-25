using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.BU;
using DMS.CORE;
using DMS.CORE.Entities.BU;

namespace DMS.BUSINESS.Services.BU
{
    public interface IAttachmentService : IGenericService<tblBuAttachment, tblAttachmentDto>
    {
        Task<PagedResponseDto> Search(AttachmentFilter filter);
    }
    public class AttachmentService : GenericService<tblBuAttachment, tblAttachmentDto>, IAttachmentService
    {
        public AttachmentService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public async Task<PagedResponseDto> Search(AttachmentFilter filter)
        {
            try
            {
                var query = _dbContext.tblBuAttachment.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x => 
                        x.Title.Contains(filter.KeyWord) ||
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
