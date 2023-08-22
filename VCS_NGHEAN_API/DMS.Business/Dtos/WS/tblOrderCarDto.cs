using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE.Entities.WS;

namespace DMS.BUSINESS.Dtos.WS
{
    public class tblOrderCarDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime TimeCheckIn { get; set; }
        public int Order { get; set; }
        public string Notes { get; set; }
        public string Status { get; set; }
        public string Vehicle { get; set; }
        public string Driver { get; set; }
        public string DoSap { get; set; }
        public string AreaCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblWsOrderCar, tblOrderCarDto>().ReverseMap();
        }
    }
}
