using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.OrderDetail
{
    public class tblOrderDetailUpdateDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public string OrderCode { get; set; }

        public string ItemCode { get; set; }

        public bool? IsMainItem { get; set; }

        public double OrderNumber { get; set; }

        public string SandCode { get; set; }

        public string StoneCode { get; set; }

        public string Slump { get; set; }

        public double? Price { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoOrderDetail, tblOrderDetailUpdateDto>().ReverseMap();
        }
    }
}
