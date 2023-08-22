using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdArea")]
    public class tblMdArea : SoftDeleteEntity
    {
        [Column(TypeName = "varchar(50)")]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string DbTgbx { get; set; }
        public string DbTdh { get; set; }
        public string DbTdhE5 { get; set; }
        public string DbSmo { get; set; }
        public string SupplyPlantSmo { get; set; }

        public virtual List<tblMdPumpRig> ListPumpRig { get; set; }
        public virtual List<tblMdPumpThroat> ListPumpThroat { get; set; }
        public virtual List<tblAdAccount> ListAccount { get; set; }
        public virtual List<tblMdCamera> ListCamera { get; set; }
        public tblMdArea()
        {
            ListPumpRig = new List<tblMdPumpRig>();
            ListPumpThroat = new List<tblMdPumpThroat>();
            ListAccount = new List<tblAdAccount>();
            ListCamera = new List<tblMdCamera>();
        }
    }
}
