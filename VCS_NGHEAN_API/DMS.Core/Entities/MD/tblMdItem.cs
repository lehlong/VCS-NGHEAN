using DMS.CORE.Common;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.MD
{
    public class tblMdItem : SoftDeleteEntity
    {
        public Guid Id { get; set; }

        [Key]
        [Required]
        [MaxLength(50)]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string UnitCode { get; set; }

        [Required]
        [MaxLength(50)]
        public string TypeCode { get; set; }

        public double? CostPrice { get; set; }

        public double? SellPrice { get; set; }

        public double? Proportion { get; set; }

        public double? PercentageOfImpurities { get; set; }

        public bool? IsMainObject { get; set; }

        public bool? IsQuantitative { get; set; }

        public virtual tblMdUnit Unit { get; set; }

        public virtual tblMdItemType ItemType { get; set; }

        public virtual tblBuItemFormula ItemFormula { get; set; }

        public virtual ICollection<tblSoOrderDetail> OrderDetails { get; set; }

        public virtual ICollection<tblSoExportDetail> ExportDetails { get; set; }

        public virtual ICollection<tblSoScale> Scales { get; set; }
    }
}
