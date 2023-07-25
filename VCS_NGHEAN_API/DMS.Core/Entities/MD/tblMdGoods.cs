using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdGoods")]
    public class tblMdGoods : SoftDeleteEntity
    {
        [Column(TypeName = "varchar(50)")]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public virtual List<tblMdPumpThroat> ListPumpThroat { get; set; }
        public tblMdGoods()
        {
            ListPumpThroat = new List<tblMdPumpThroat>();
        }

    }
}
