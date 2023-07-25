using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.OrderReleaseProcess
{
    public class tblOrderReleaseProcessDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderReleaseCode { get; set; }

        public string ActionCode { get; set; }

        public string PrevState { get; set; }

        public string State { get; set; }

        [JsonIgnore]
        public virtual tblSoOrderRelease OrderRelease { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderReleaseProcess, tblOrderReleaseProcessDto>().ReverseMap();
        }
    }
}
