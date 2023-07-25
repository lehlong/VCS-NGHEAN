using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.OrderDetail
{
    public class tblOrderDetailDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ItemCode { get; set; }

        public bool? IsMainItem { get; set; }

        public double OrderNumber { get; set; }

        public string SandCode { get; set; }

        public string StoneCode { get; set; }

        public string Slump { get; set; }

        public double? Price { get; set; }

        public double? ReleaseNumber { get; set; }

        private double? _sumMoney;

        public double? SumMoney { get => _sumMoney; private set => _sumMoney = ReleaseNumber * Price; }

        public virtual tblItemLiteDto Item { get; set; }

        public virtual tblItemLiteDto Sand { get; set; }

        public virtual tblItemLiteDto Stone { get; set; }

        [JsonIgnore]
        public virtual tblOrderDto Order { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderDetail, tblOrderDetailDto>().ReverseMap();
        }
    }

    public class tblOrderDetailCreateDto : IMapFrom
    {
        public string ItemCode { get; set; }

        public bool? IsMainItem { get; set; }

        public double OrderNumber { get; set; }

        public string SandCode { get; set; }

        public string StoneCode { get; set; }

        public string Slump { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderDetail, tblOrderDetailCreateDto>().ReverseMap();
        }
    }
}
