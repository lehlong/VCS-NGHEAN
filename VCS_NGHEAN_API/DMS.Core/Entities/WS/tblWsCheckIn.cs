using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.WS
{
    [Table("tblWsCheckIn")]
    public class tblWsCheckIn : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime TimeCheckIn { get; set; }
        public string Vehicle { get; set; }
        public string Driver { get; set; }
        public string DoSap { get; set; }
    }
}
