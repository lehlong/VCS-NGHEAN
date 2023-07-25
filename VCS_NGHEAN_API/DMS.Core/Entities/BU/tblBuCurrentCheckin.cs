using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuCurrentCheckIn : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Vehicle { get; set; }

        public DateTime CheckInTime { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string CheckInConfirm { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string CheckInNote { get; set; }
    }
}
