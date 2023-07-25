using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblVehicleTypeDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdVehicleType, tblVehicleTypeDto>().ReverseMap();
        }
    }

    public class tblVehicleTypeLiteDto : IMapFrom
    {
        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdVehicleType, tblVehicleTypeLiteDto>().ReverseMap();
        }
    }
}
