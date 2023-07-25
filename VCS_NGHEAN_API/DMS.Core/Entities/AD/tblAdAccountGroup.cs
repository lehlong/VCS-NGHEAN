using DMS.CORE.Common;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.AD
{
    public class tblAdAccountGroup : BaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public string RoleCode { get; set; }
        public virtual List<tblAdAccount> ListAccount { get; set; }
        public virtual List<tblAdAccountGroupRight> ListAccountGroupRight { get; set; }

        public tblAdAccountGroup()
        {
            ListAccount = new List<tblAdAccount>();
            ListAccountGroupRight = new List<tblAdAccountGroupRight>();
        }
    }
}
