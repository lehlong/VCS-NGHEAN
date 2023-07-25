using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    [Table("tblSoOrderReleaseProcess")]
    public class tblSoOrderReleaseProcess : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("tblSoOrderRelease")]
        [Column(TypeName = "varchar(50)")]
        public string OrderReleaseCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ActionCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PrevState { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        public virtual tblSoOrderRelease OrderRelease { get; set; }
    }
}
