using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdPumpThroat")]
    public class tblMdPumpThroat : SoftDeleteEntity
    {
        [Column(TypeName = "varchar(50)")]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public int Wattage { get; set; }

        [Required]
        public string AreaCode { get; set; }
        [Required]
        public string GoodsCode { get; set; }
        [Required]
        public string PumpRigCode { get; set; }

        public virtual tblMdArea Area { get; set; }
        public virtual tblMdGoods Goods { get; set; }
        public virtual tblMdPumpRig PumpRig { get; set; }

    }
}
