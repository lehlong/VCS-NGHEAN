using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.OrderReleaseProcess;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.OrderRelease
{
    public class tblOrderReleaseDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; set; }

        public string OrderCode { get; set; }

        public double? MixNumber { get; set; }

        public string SealNumber { get; set; }

        public double? WeightIn { get; set; }

        public DateTime? WeightInTime { get; set; }

        public double? WeightOut { get; set; }

        public DateTime? WeightOutTime { get; set; }

        public string MixVehicleCode { get; set; }

        public string MixerCode { get; set; }

        public string PumpVehicleCode { get; set; }

        public DateTime? MixDate { get; set; }

        public virtual tblMixerDto Mixer { get; set; }

        [JsonIgnore]
        public virtual tblSoOrder Order { get; set; }

        public virtual List<tblOrderReleaseProcessDto> ReleaseProcesses { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderRelease, tblOrderReleaseDto>().ReverseMap();
        }
    }

}
