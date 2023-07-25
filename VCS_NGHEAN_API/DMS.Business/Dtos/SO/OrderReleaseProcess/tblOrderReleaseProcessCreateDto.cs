using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;

namespace DMS.BUSINESS.Dtos.SO.OrderReleaseProcess
{
    public class tblOrderReleaseProcessCreateDto : IMapFrom, IDto
    {
        public string OrderReleaseCode { get; set; }

        public string ActionCode { get; set; }

        public string PrevState { get; set; }

        public string State { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderReleaseProcess, tblOrderReleaseProcessCreateDto>().ReverseMap();
        }
    }
}
