using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuAttachment : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Title { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Url { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Thumbnail { get; set; }

        public double Size { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Type { get; set; }

        public virtual tblBuCheckInOutImage Image { get; set; }
    }
}
