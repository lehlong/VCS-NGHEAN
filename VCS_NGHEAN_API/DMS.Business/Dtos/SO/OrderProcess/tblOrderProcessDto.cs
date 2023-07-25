using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace DMS.BUSINESS.Dtos.SO.OrderProcess
{
    public class tblOrderProcessDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ActionCode { get; set; }

        public string PrevState { get; set; }

        public string State { get; set; }

        public DateTime? CreateDate { get; set; }

        [JsonIgnore]
        public virtual tblSoOrder Order { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderProcess, tblOrderProcessDto>().ReverseMap();
        }
    }
}
