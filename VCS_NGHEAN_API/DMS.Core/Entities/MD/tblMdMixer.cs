using DMS.CORE.Common;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.MD
{
    public class tblMdMixer : SoftDeleteEntity
    {
        [Required]
        [MaxLength(50)]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public virtual ICollection<tblSoOrder> Orders { get; set; }

        public virtual ICollection<tblSoOrderRelease> OrderReleases { get; set; }   
    }
}
