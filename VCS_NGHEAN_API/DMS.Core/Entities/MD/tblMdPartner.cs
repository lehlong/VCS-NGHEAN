﻿using DMS.CORE.Common;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.MD
{
    public class tblMdPartner : SoftDeleteEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }

        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [MaxLength(100)]
        public string Name { get; set; }

        public bool IsCustomer { get; set; }

        public bool IsProvider { get; set; }

        [MaxLength(255)]
        public string Address { get; set; }

        [MaxLength(15)]
        public string PhoneNumber { get; set; }

        [MaxLength(50)]
        public string Email { get; set; }

        public virtual ICollection<tblSoOrder> Orders { get; set; }

        public virtual ICollection<tblSoExport> Exports { get; set; }

        public virtual ICollection<tblBuCustomerCare> CustomerCares { get; set; }

        public virtual ICollection<tblSoScale> Scales { get; set; }
    }
}
