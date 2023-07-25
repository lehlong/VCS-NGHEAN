using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    public class tblSoOrderDetail : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [ForeignKey("tblSoOrder")]
        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ItemCode { get; set; }

        public bool? IsMainItem { get; set; }

        public double OrderNumber { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string SandCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string StoneCode { get; set; }

        public string Slump { get; set; }

        public double? Price { get; set; }

        public double? ReleaseNumber { get; set; }

        public double? SumMoney { get; set; }

        public virtual tblSoOrder Order { get; set; }
        
        public virtual tblMdItem Item { get; set; }

        public virtual tblMdItem Sand { get; set; }

        public virtual tblMdItem Stone { get; set; }
    }
}
