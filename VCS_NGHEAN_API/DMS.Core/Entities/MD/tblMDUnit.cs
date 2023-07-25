using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.MD
{
    public class tblMdUnit : SoftDeleteEntity
    {
        [Required]
        [MaxLength(50)]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public virtual ICollection<tblMdItem> ListItem { get; set; }

        public tblMdUnit()
        {
            ListItem = new List<tblMdItem>();
        }
    }
}
