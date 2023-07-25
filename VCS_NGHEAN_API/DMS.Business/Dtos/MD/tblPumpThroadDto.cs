using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblPumpThroatDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }
        public int Wattage { get; set; }

        public string AreaCode { get; set; }

        public string GoodsCode { get; set; }

        public string PumpRigCode { get; set; }

        public tblMdArea Area { get; set; }
        public tblMdGoods Goods { get; set; }
        public tblMdPumpRig PumpRig { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPumpThroat, tblPumpThroatDto>().ReverseMap();
        }
    }
}
