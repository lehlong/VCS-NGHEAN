using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblVehicleDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string ImagePlate { get; set; }

        public string ImageCar { get; set; }

        public string Note { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdVehicle, tblVehicleDto>().ReverseMap();
        }
    }
}
