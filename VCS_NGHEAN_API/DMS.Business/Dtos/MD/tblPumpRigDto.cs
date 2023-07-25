using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.AD;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblPumpRigDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }
        public string AreaCode { get; set; }
        public tblMdArea Area { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdPumpRig, tblPumpRigDto>().ReverseMap();
        }
    }
}
