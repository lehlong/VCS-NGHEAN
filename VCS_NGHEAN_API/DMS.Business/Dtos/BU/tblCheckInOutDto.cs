using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblCheckInOutDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Vehicle { get; set; }

        public DateTime CheckInTime { get; set; }

        public string CheckInConfirm { get; set; }

        public string CheckInNote { get; set; }

        public DateTime CheckOutTime { get; set; }

        public string CheckOutConfirm { get; set; }

        public string CheckOutNote { get; set; }

        public virtual List<tblBuCheckInOutImage> Images { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCheckInOut, tblCheckInOutDto>().ReverseMap();
        }
    }

    public class tblCheckInOutLiteDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Vehicle { get; set; }

        public DateTime CheckInTime { get; set; }

        public string CheckInConfirm { get; set; }

        public string CheckInNote { get; set; }

        public DateTime CheckOutTime { get; set; }

        public string CheckOutConfirm { get; set; }

        public string CheckOutNote { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCheckInOut, tblCheckInOutLiteDto>().ReverseMap();
        }
    }
}
