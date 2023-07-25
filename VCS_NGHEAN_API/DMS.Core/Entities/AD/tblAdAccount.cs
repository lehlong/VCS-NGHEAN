using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;

namespace DMS.CORE.Entities.AD
{
    public class tblAdAccount : BaseEntity
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Password { get; set; }
        public string UserType { get; set; }

        public Guid GroupId { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }
        public string AreaCode { get; set; }

        public string Address { get; set; }

        public Guid? PortalId { get; set; }

        public virtual tblAdAccountGroup AccountGroup { get; set; }
        public virtual tblMdUserType AccountType { get; set; }
        public virtual tblMdArea Area { get; set; }
    }
}
