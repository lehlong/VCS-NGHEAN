using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblCameraDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }
        public string SourceRtsp { get; set; }
        public string LinkPlay { get; set; }
        public string AreaCode { get; set; }
        public string InOut { get; set; }
        public string LinkCapture { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public tblMdArea Area { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdCamera, tblCameraDto>().ReverseMap();
        }
    }
}
