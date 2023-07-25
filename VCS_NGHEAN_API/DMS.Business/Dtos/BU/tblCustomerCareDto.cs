using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.BUSINESS.Dtos.MD;
using DMS.BUSINESS.Dtos.SO.Order;
using DMS.CORE.Entities.BU;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.BU
{
    public class tblCustomerCareDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string PartnerCode { get; set; }

        public DateTime CareDate { get; set; }

        public string CareContent { get; set; }

        public virtual tblOrderDto Order { get; set; }

        public virtual tblPartnerDto Partner { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCustomerCare, tblCustomerCareDto>().ReverseMap();
        }
    }

    public class tblCustomerCareLiteDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string PartnerCode { get; set; }

        public DateTime CareDate { get; set; }

        public string CareContent { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblBuCustomerCare, tblCustomerCareLiteDto>().ReverseMap();
        }
    }
}
