using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    [Table("tblBuNotification")]
    public class tblBuNotification : SoftDeleteEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        [ForeignKey("tblAdAccount")]
        public string UserName { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Headings { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Subtitle { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Contents { get; set; }

        [Column(TypeName = "nvarchar(MAX)")]
        public string Url { get; set; }

        public int? Type { get; set; }

        public bool? IsSeen { get; set; }

        public bool? IsSent { get; set; }

        [ForeignKey("UserName")]
        public virtual tblAdAccount Account { get; set; }
    }
}
