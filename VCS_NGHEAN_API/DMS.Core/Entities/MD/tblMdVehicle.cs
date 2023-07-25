using DMS.CORE.Common;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdVehicle : SoftDeleteEntity
    {
        [Required]
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        public string ImagePlate { get; set; }
        public string ImageCar { get; set; }
        public string Note { get; set; }

    }
}
