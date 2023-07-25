using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdDeviceGroup : SoftDeleteEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Name { get; set; }

        public virtual List<tblMdDevice> ListDevice { get; set; }

        public tblMdDeviceGroup()
        {
            ListDevice = new List<tblMdDevice>();
        }
    }
}
