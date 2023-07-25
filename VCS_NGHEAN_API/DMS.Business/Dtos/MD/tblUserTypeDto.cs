using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.AD;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblUserTypeDto : BaseMdDto, IMapFrom, IDto
    {
        [Key]
        public string Id { get; set; }

        public string Name { get; set; }
        public List<tblAccountDto> ListAccount { get; set; }
        public tblUserTypeDto()
        {
            ListAccount = new List<tblAccountDto>();
        }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdUserType, tblUserTypeDto>().ReverseMap();
        }
    }
}
