using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblDriversDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string FullName { get; set; }

        public string PhoneNumber { get; set; }

        public string ImageFront { get; set; }
        public string ImageLeft { get; set; }
        public string ImageRight { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdDrivers, tblDriversDto>().ReverseMap();
        }
    }
}
