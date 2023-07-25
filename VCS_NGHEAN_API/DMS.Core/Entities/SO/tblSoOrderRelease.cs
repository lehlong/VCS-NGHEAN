using DMS.CORE.Common;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DMS.CORE.Entities.SO
{
    [Table("tblSoOrderRelease")]
    public class tblSoOrderRelease : BaseEntity
    {
        [Key]
        [Column(TypeName = "varchar(50)")]
        public string Code { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string State { get; set; }

        [ForeignKey("tblSoOrder")]
        [Column(TypeName = "varchar(50)")]
        public string OrderCode { get; set; }

        [Column(TypeName = "float")]
        public double? MixNumber { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string SealNumber { get; set; }

        [Column(TypeName = "float")]
        public double? WeightIn { get; set; }

        public DateTime? WeightInTime { get; set; }

        [Column(TypeName = "float")]
        public double? WeightOut { get; set; }

        public DateTime? WeightOutTime { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdVehicle")]
        public string MixVehicleCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        [ForeignKey("tblMdMixer")]
        public string MixerCode { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PumpVehicleCode { get; set; }

        public DateTime? MixDate { get; set; }

        public virtual tblSoOrder Order { get; set; }

        [ForeignKey("MixVehicleCode")]
        public virtual tblMdVehicle Vehicle { get; set; }

        public virtual ICollection<tblSoOrderReleaseProcess> ReleaseProcesses { get; set; }

        public virtual tblMdMixer Mixer { get; set; }

    }
}
