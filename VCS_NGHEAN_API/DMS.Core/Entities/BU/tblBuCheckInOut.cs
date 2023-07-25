using DMS.CORE.Common;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuCheckInOut : BaseEntity
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

        public DateTime CheckOutTime { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string CheckOutConfirm { get; set; }

        [Column(TypeName = "varchar(255)")]
        public string CheckOutNote { get; set; }

        public virtual List<tblBuCheckInOutImage> Images { get; set; }

        public tblBuCheckInOut()
        {
            Images = new List<tblBuCheckInOutImage>();
        }
    }
}
