using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.AD
{
    public class tblAdRight : BaseEntity
    {
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }

        public string PId { get; set; }

        public int? OrderNumber { get; set; }

        public virtual List<tblAdAccountGroupRight> ListAccountGroupRight { get; set; }

        public tblAdRight()
        {
            ListAccountGroupRight = new List<tblAdAccountGroupRight>();
        }
    }
}
