using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.SO;
using System.ComponentModel.DataAnnotations;

namespace DMS.BUSINESS.Dtos.SO.OrderExport
{
    public class OrderDetailDebtCloseDto : IMapFrom, IDto
    {
        [Key]
        public Guid Id { get; set; }

        public double? Price { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblSoExportDetail, OrderDetailDebtCloseDto>().ReverseMap();
        }
    }
}
