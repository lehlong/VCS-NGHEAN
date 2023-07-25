using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdCamera")]
    public class tblMdCamera : SoftDeleteEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string SourceRtsp { get; set; }
        public string LinkPlay { get; set; }
        public string AreaCode { get; set; }
        public string InOut { get; set; }
        public string LinkCapture { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public virtual tblMdArea Area { get; set; }
    }
}
