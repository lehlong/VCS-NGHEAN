using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.BU.Notification;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Filter.Common;
using DMS.CORE;
using DMS.CORE.Entities.BU;
using Microsoft.EntityFrameworkCore;

namespace DMS.BUSINESS.Services.BU.Notìication
{
    public interface INotificationService : IGenericService<tblBuNotification, tblNotificationDto>
    {
        Task<PagedResponseDto> Search(BaseFilter filter, string username);
        Task<tblNotificationDto> GetById(int id, string username);
        Task Seen(int id, string username);
        Task Delete(int id, string username);
    }
    public class NotificationService : GenericService<tblBuNotification, tblNotificationDto>, INotificationService
    {
        public NotificationService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<PagedResponseDto> Search(BaseFilter filter, string username)
        {
            var query = _dbContext.tblBuNotification.Where(x => x.UserName == username && x.IsActive == filter.IsActive)
                .Where(x => string.IsNullOrWhiteSpace(filter.KeyWord) || x.Subtitle.Contains(filter.KeyWord) || x.Contents.Contains(filter.KeyWord))
                .OrderByDescending(x => x.CreateDate).AsQueryable();

            return await Paging(query, filter);
        }

        public async Task<tblNotificationDto> GetById(int id, string username)
        {
            var data = await _dbContext.tblBuNotification.FirstOrDefaultAsync(x => x.Id == id && x.UserName == username);

            return _mapper.Map<tblNotificationDto>(data);
        }

        public async Task Seen(int id, string username)
        {
            try
            {
                var currentObj = await _dbContext.tblBuNotification.FirstOrDefaultAsync(x => x.Id == id && x.UserName == username);
                if (currentObj == null)
                {
                    this.Status = false;
                    this.MessageObject = new()
                    {
                        Code = "2000"
                    };
                    return;
                }
                currentObj.IsSeen = true;
                _dbContext.Entry(currentObj).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }

        public async Task Delete(int id, string username)
        {
            try
            {
                var currentObj = await _dbContext.tblBuNotification.FirstOrDefaultAsync(x => x.Id == id && x.UserName == username);
                if (currentObj == null)
                {
                    this.Status = false;
                    this.MessageObject = new()
                    {
                        Code = "2000"
                    };
                    return;
                }
                currentObj.IsActive = false;
                _dbContext.Entry(currentObj).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
            }
        }


    }
}
