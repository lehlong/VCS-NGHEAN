using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common.Enum;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAccountGroupDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Notes { get; set; }

        public string RoleCode { get; set; }

        public Roles Role
        {
            get
            {
                if (Enum.TryParse(RoleCode, out Roles r))
                {
                    return r;
                }
                return Roles.KHONG_XAC_DINH;
            }
        }
        public List<tblAccountDto> ListAccount { get; set; }

        public List<tblAccountGroupRightDto> ListAccountGroupRight { get; set; }

        public tblRightDto TreeRight { get; set; }

        public tblAccountGroupDto()
        {
            ListAccount = new List<tblAccountDto>();
            ListAccountGroupRight = new List<tblAccountGroupRightDto>();
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAccountGroupDto>().ReverseMap();
        }
    }

    public class tblAccountGroupUpdateDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Notes { get; set; }
        public List<tblAccountGroupRightDto> ListAccountGroupRight { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccountGroup, tblAccountGroupUpdateDto>().ReverseMap();
        }
    }
}
