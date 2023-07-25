using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    [Table("tblSoOrderProcess")]
    public class tblSoOrderProcess : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey("tblSoOrder")]
        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string ActionCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PrevState { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        public virtual tblSoOrder Order { get; set; }
    }
}
