using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using AutoMapper;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblDeviceGroupDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDeviceGroup, tblDeviceGroupDto>().ReverseMap();
        }
    }

    public class tblDeviceGroupLiteDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDeviceGroup, tblDeviceGroupLiteDto>().ReverseMap();
        }
    }
}
