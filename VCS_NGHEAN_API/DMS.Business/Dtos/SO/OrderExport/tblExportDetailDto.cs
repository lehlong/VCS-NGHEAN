using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.OrderExport
{
    public class tblExportDetailDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string ExportCode { get; set; }

        public string ItemCode { get; set; }

        public bool? IsMainItem { get; set; }

        public double OrderNumber { get; set; }

        public double Number { get; set; }

        public double? Price { get; set; }

        private double? _sumMoney { get; set; }
        public double? SumMoney { get => _sumMoney; set => _sumMoney = Number * Price; }

        [JsonIgnore]
        public virtual tblOrderExportDto Export { get; set; }

        public virtual tblItemDto Item { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoExportDetail, tblExportDetailDto>().ReverseMap();
        }
    }
}
