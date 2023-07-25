using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdUserType")]
    public class tblMdUserType : SoftDeleteEntity
    {
        [Column(TypeName = "varchar(50)")]
        [Key]
        public string Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public virtual List<tblAdAccount> ListAccount { get; set; }
        public tblMdUserType()
        {
            ListAccount = new List<tblAdAccount>();
        }
    }
}
