using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    [Table("tblSoExport")]
    public class tblSoExport : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "char(2)")]
        public string Type { get; set; }

        public DateTime? ExportDate { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdPartner")]
        public string PartnerCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        public double? Discount { get; set; }

        public double? TaxVat { get; set; }

        public double? SumMoney { get; set; }

        public double? PayMoney { get; set; }

        public double? Debt { get; set; }

        [ForeignKey("OrderCode")]
        public virtual tblSoOrder Order { get; set; }

        public virtual tblMdPartner Partner { get; set; }

        public virtual ICollection<tblSoExportDetail> ExportDetails { get; set; }
    }
}
