using AutoMapper;
using DMS.CORE.Entities.AD;
using DMS.BUSINESS.Common.Mapping;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.MD;

namespace DMS.BUSINESS.Dtos.AD
{
    public class tblAccountDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public Guid GroupId { get; set; }
        public string UserType { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }
        public string AreaCode { get; set; }

        public string Address { get; set; }

        public Guid? PortalId { get; set; }

        public tblAccountGroupDto AccountGroup { get; set; }
        public tblUserTypeDto AccountType { get; set; }
        public tblAreaDto Area { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountDto>().ReverseMap();
        }
    }

    public class tblAccountCreateDto : BaseAdDto, IMapFrom, IDto
    {
        [Key]
        public string UserName { get; set; }

        public string FullName { get; set; }

        public string Password { get; set; }

        public Guid GroupId { get; set; }

        public string PhoneNumber { get; set; }

        public string Email { get; set; }

        public string Address { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblAdAccount, tblAccountCreateDto>().ReverseMap();
        }
    }
}
