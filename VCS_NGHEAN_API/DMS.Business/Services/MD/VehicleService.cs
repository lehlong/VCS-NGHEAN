using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Filter.Common;
using DMS.BUSINESS.Filter.MD;
using DMS.CORE;
using DMS.CORE.Entities.MD;
using DocumentFormat.OpenXml.InkML;
using DocumentFormat.OpenXml.Vml;
using Microsoft.EntityFrameworkCore;
using System.Net;

namespace DMS.BUSINESS.Services.MD
{
    public interface IVehicleService : IGenericService<tblMdVehicle, tblVehicleDto>
    {
        Task<IList<tblVehicleDto>> GetAll(VehicleFilterLite filter);
        Task<string> CaptureImage(string username);
    }
    public class VehicleService : GenericService<tblMdVehicle, tblVehicleDto>, IVehicleService
    {
        public VehicleService(AppDbContext dbContext, IMapper mapper) : base(dbContext, mapper)
        {
        }

        public override async Task<PagedResponseDto> Search(BaseFilter filter)
        {
            try
            {
                var query = this._dbContext.tblMdVehicle.AsQueryable();
                if (!string.IsNullOrWhiteSpace(filter.KeyWord))
                {
                    query = query.Where(x =>
                        x.Code.Contains(filter.KeyWord)
                    );
                }
                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Code);
                return await this.Paging(query, filter);
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<IList<tblVehicleDto>> GetAll(VehicleFilterLite filter)
        {
            try
            {
                var query = this._dbContext.tblMdVehicle.AsQueryable();

                if (filter.IsActive.HasValue)
                {
                    query = query.Where(x => x.IsActive == filter.IsActive);
                }
                query = query.OrderBy(x => x.Code);
                return _mapper.Map<IList<tblVehicleDto>>(await query.ToListAsync());
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
        }

        public async Task<string> CaptureImage(string username)
        {
            try
            {
                var user = await this._dbContext.tblAdAccount.FirstOrDefaultAsync(x => x.UserName == username);
                var camera = await this._dbContext.tblMdCamera.FirstOrDefaultAsync(x => x.AreaCode == user.AreaCode && x.InOut == "in");

                var path = "/uploads/content/" + Guid.NewGuid().ToString() + ".jpg";
                var pathSaveFile = System.IO.Directory.GetCurrentDirectory() + path;


                var request = HttpWebRequest.Create(camera.LinkCapture);
                request.Credentials = new NetworkCredential(camera.UserName, camera.Password);
                request.Proxy = null;
                using (HttpWebResponse response = (HttpWebResponse)request.GetResponse())
                using (Stream stream = response.GetResponseStream())
                using (var fileStream = new FileStream(pathSaveFile, FileMode.Create, FileAccess.Write))
                {
                    stream.CopyTo(fileStream);
                }

                return path;
            }
            catch (Exception ex)
            {
                this.Status = false;
                this.Exception = ex;
                return null;
            }
            return null;
        }
    }
}
