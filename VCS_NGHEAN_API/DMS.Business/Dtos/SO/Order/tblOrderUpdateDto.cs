using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.SO.OrderDetail;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class tblOrderUpdateDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; set; }

        public string PartnerCode { get; set; }

        public string PartnerNote { get; set; }

        public string AreaCode { get; set; }

        public DateTime? PourDate { get; set; }

        public string PourLocation { get; set; }

        public string PourCategory { get; set; }

        public string PourTypeCode { get; set; }

        public string OrderTypeCode { get; set; }

        public double? PourLatitude { get; set; }

        public double? PourLongitude { get; set; }

        public string MixerCode { get; set; }

        public virtual List<tblOrderDetailUpdateDto> OrderDetails { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderUpdateDto>().ReverseMap();
        }
    }
}
