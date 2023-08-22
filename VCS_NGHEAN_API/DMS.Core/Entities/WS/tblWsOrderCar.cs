using DMS.CORE.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DMS.CORE.Entities.WS
{
    public class tblWsOrderCar : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }
        public DateTime TimeCheckIn { get; set; }
        public int Order { get; set; }
        public string Notes { get; set; }
        public string Status { get; set; }
        public string Vehicle { get; set; }
        public string Driver { get; set; }
        public string DoSap { get; set; }
        public string AreaCode { get; set; }
    }
}
