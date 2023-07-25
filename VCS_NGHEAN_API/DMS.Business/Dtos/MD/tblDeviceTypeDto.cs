using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using AutoMapper;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblDeviceTypeDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDeviceType, tblDeviceTypeDto>().ReverseMap();
        }
    }

    public class tblDeviceTypeLiteDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDeviceType, tblDeviceTypeLiteDto>().ReverseMap();
        }
    }
}
