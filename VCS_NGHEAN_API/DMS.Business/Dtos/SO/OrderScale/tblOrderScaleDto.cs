using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.OrderRelease;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.OrderScale
{
    public class tblOrderScaleDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string OrderReleaseCode { get; set; }

        public string ScaleTypeCode { get; set; }

        public string CustomerCode { get; set; }

        public string CustomerName { get; set; }

        public string CustomerPhone { get; set; }

        public string CustomerAddress { get; set; }

        public string VehicleCode { get; set; }

        public string DriverName { get; set; }

        public string ItemCode { get; set; }

        public string ItemName { get; set; }

        public double? ItemNumber { get; set; }

        public double? ItemPrice { get; set; }

        public double? ItemProportion { get; set; }

        public double? ItemPercentageOfImpurities { get; set; }

        public double? ItemImpurities { get; set; }

        public double? _ItemMoney { get; set; }
        public double? ItemMoney { get => _ItemMoney; set => _ = ItemPrice * ItemNumber; }

        public string Seal { get; set; }

        public string Note { get; set; }

        public double? Weight1 { get; set; }

        public double? Weight2 { get; set; }

        public DateTime? TimeWeight1 { get; set; }

        public DateTime? TimeWeight2 { get; set; }

        public double? Weight { get; set; }

        public double? Exchange { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual tblItemDto Item { get; set; }

        public virtual tblOrderReleaseDto OrderRelease { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoScale, tblOrderScaleDto>().ReverseMap();
        }
    }
}
