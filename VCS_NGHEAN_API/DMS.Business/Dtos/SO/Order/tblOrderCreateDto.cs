using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.SO.OrderDetail;
using DMS.CORE.Entities.SO;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class tblOrderCreateDto : IMapFrom, IDto
    {
        public string State { get; } = OrderState.CHUA_XAC_NHAN.ToString();

        public string PartnerCode { get; set; }

        public string PartnerNote { get; set; }

        public string AreaCode { get; set; }

        public List<DateTime?> PourDate { get; set; }

        public string PourLocation { get; set; }

        public string PourCategory { get; set; }

        public string PourTypeCode { get; set; }

        public string OrderTypeCode { get; set; }

        public double? PourLatitude { get; set; }

        public double? PourLongitude { get; set; }

        public virtual List<tblOrderDetailCreateDto> OrderDetails { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblOrderCreateDto, tblSoOrder>().ForMember(dest => dest.PourDate, opt => opt.Ignore());
        }
    }

}
