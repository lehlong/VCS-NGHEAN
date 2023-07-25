using DMS.CORE.Common;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    public class tblSoOrder : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PartnerCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string PartnerNote { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdArea")]
        public string AreaCode { get; set; }

        public DateTime? PourDate { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string PourLocation { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string PourCategory { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdPourType")]
        public string PourTypeCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdOrderType")]
        public string OrderTypeCode { get; set; }

        [Column(TypeName = "float")]
        public double? PourLatitude { get; set; }

        [Column(TypeName = "float")]
        public double? PourLongitude { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdMixer")]
        public string MixerCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblSoExport")]
        public string ExportCode { get; set; }

        public virtual tblSoExport Export { get; set; }

        public virtual ICollection<tblSoOrderDetail> OrderDetails { get; set; }

        public virtual tblMdPartner Partner { get; set; }

        public virtual tblMdArea Area { get; set; }

        public virtual tblMdOrderType OrderType { get; set; }

        public virtual tblMdPourType PourType { get; set; }

        public virtual ICollection<tblSoOrderProcess> OrderProcesses { get; set; }

        public virtual ICollection<tblSoOrderRelease> OrderReleases { get; set; }

        public virtual ICollection<tblBuCustomerCare> CustomerCares { get; set; }

        public virtual ICollection<tblSoScale> Scales { get; set; }

        public virtual tblMdMixer Mixer { get; set; }
     }
}
