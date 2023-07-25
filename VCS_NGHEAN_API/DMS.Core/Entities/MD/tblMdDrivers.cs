using DMS.CORE.Common;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdDrivers : SoftDeleteEntity
    {
        [Required]
        [Key]
        public Guid Id { get; set; }
        public string FullName { get; set; }
        public string PhoneNumber { get; set; }
        public string ImageFront { get; set; }
        public string ImageLeft { get; set; }
        public string ImageRight { get; set; }

    }
}
