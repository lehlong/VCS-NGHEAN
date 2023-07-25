using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    [Table("tblMdPumpRig")]
    public class tblMdPumpRig : SoftDeleteEntity
    {
        [Column(TypeName = "varchar(50)")]
        [Key]
        public string Code { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        public string AreaCode { get; set; }

        public virtual tblMdArea Area { get; set; }
        public virtual List<tblMdPumpThroat> ListPumpThroat { get; set; }

    }
}
