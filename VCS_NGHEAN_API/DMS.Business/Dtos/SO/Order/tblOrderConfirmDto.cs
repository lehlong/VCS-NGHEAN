using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class tblOrderConfirmDto : IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string State { get; private set; } = OrderState.DA_XAC_NHAN.ToString();

        public string MixerCode { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrder, tblOrderConfirmDto>().ReverseMap();
        }
    }
}
