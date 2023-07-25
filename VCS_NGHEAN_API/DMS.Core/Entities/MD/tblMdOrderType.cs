using DMS.CORE.Common;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdOrderType")]
    public class tblMdOrderType : SoftDeleteEntity
    {
        [MaxLength(50)]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public virtual ICollection<tblSoOrder> Orders { get; set; }
    }
}
