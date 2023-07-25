using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    public class tblSoExportDetail : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("tblSoExport")]
        [Column(TypeName = "varchar(50)")]
        public string ExportCode { get; set; }

        [ForeignKey("tblMdItem")]
        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        public bool? IsMainItem { get; set; }

        public double? OrderNumber { get; set; }

        public double? Number { get; set; }

        public double? Price { get; set; }

        public double? SumMoney { get; set; }

        public virtual tblSoExport Export { get; set; }

        public virtual tblMdItem Item { get; set; }
    }
}
