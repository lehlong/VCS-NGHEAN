using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.OrderDetail;
using DMS.BUSINESS.Dtos.SO.OrderProcess;
using DMS.BUSINESS.Dtos.SO.OrderRelease;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class tblOrderDto : IMapFrom, IDto
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

        public string CreateBy { get; set; }

        public string UpdateBy { get; set; }

        public DateTime? CreateDate { get; set; }

        public DateTime? UpdateDate { get; set; }

        public bool? IsDeleted { get; set; }

        public string MixerCode { get; set; }

        public string ExportCode { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public virtual tblAreaDto Area { get; set; }

        public virtual tblOrderTypeDto OrderType { get; set; }

        public virtual tblPourTypeDto PourType { get; set; }

        public virtual List<tblOrderDetailDto> OrderDetails { get; set; }

        public virtual List<tblOrderReleaseDto> OrderReleases { get; set; }

        public virtual List<tblOrderProcessDto> OrderProcesses { get; set; }

        public virtual tblMixerDto Mixer { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderDto>().ReverseMap();
        }
    }
}
