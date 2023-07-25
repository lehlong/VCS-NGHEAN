using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.BU
{
    public class tblBuCustomerCare : BaseEntity
    {
        [Key]
        public Guid Id { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PartnerCode { get; set; }

        public DateTime CareDate { get; set; }

        public string CareContent { get; set; }

        [ForeignKey("OrderCode")]
        public virtual tblSoOrder Order { get; set; }

        [ForeignKey("PartnerCode")]
        public virtual tblMdPartner Partner { get; set; }
    }
}
