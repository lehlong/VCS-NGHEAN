using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    [Table("tblSoScale")]
    public class tblSoScale : SoftDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblSoOrder")]
        public string OrderCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblSoOrderRelease")]
        public string OrderReleaseCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ScaleTypeCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdPartner")]
        public string CustomerCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string CustomerName { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string CustomerPhone { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string CustomerAddress { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string VehicleCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string DriverName { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdItem")]
        public string ItemCode { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string ItemName { get; set; }

        [Column(TypeName = "float")]
        public double? ItemNumber { get; set; }

        [Column(TypeName = "float")]
        public double? ItemPrice { get; set; }

        [Column(TypeName = "float")]
        public double? ItemProportion { get; set; }

        [Column(TypeName = "float")]
        public double? ItemPercentageOfImpurities { get; set; }

        [Column(TypeName = "float")]
        public double? ItemImpurities { get; set; }

        [Column(TypeName = "float")]
        public double? ItemMoney { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Seal { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Note { get; set; }

        [Column(TypeName = "float")]
        public double? Weight1 { get; set; }

        [Column(TypeName = "float")]
        public double? Weight2 { get; set; }

        public DateTime? TimeWeight1 { get; set; }

        public DateTime? TimeWeight2 { get; set; }

        [Column(TypeName = "float")]
        public double? Weight { get; set; }

        [Column(TypeName = "float")]
        public double? Exchange { get; set; }

        public virtual tblSoOrder Order { get; set; }

        public virtual tblMdPartner Partner { get; set; }

        public virtual tblMdItem Item { get; set; }

        [ForeignKey("OrderReleaseCode")]
        public virtual tblSoOrderRelease OrderRelease { get; set; }
    }
}
