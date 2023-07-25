using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.OrderExport
{
    public class tblOrderExportDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Type { get; set; }

        public DateTime? ExportDate { get; set; }

        public string State { get; set; }

        public string PartnerCode { get; set; }

        public string OrderCode { get; set; }

        public double? Discount { get; set; }

        public double? TaxVat { get; set; }

        public double? SumMoney { get; set; }

        public double? PayMoney { get; set; }

        private double? _debt;
        public double? Debt { get => _debt; private set => _debt = SumMoney - PayMoney; }

        public virtual tblOrderDto Order { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual ICollection<tblExportDetailDto> ExportDetails { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoExport, tblOrderExportDto>().ReverseMap();
        }
    }
}
