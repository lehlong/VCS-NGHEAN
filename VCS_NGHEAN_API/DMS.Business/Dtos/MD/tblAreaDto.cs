using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.AD;
using DMS.CORE.Entities.AD;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblAreaDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Code { get; set; }

        public string Name { get; set; }
        public List<tblMdPumpRig> ListPumpRig { get; set; }
        public List<tblAdAccount> ListAccount { get; set; }
        public List<tblMdCamera> ListCamera { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdArea, tblAreaDto>().ReverseMap();
        }
    }
}
