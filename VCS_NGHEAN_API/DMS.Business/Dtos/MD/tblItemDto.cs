using AutoMapper;
using DMS.BUSINESS.Common;
using DMS.BUSINESS.Common.Mapping;
using DMS.CORE.Entities.MD;
using System.ComponentModel.DataAnnotations;
using DMS.BUSINESS.Dtos.Common;
using DMS.BUSINESS.Dtos.BU;

namespace DMS.BUSINESS.Dtos.MD
{
    public class tblItemDto : BaseMdDto, IMapFrom, IDto
    {
        public Guid Id { get; set; }

        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string UnitCode { get; set; }

        public string TypeCode { get; set; }

        public double? CostPrice { get; set; }

        public double? SellPrice { get; set; }

        public double? Proportion { get; set; }

        public double? PercentageOfImpurities { get; set; }

        public bool? IsMainObject { get; set; }

        public bool? IsQuantitative { get; set; }

        public virtual tblItemFormulaDto ItemFormula { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblItemTypeDto ItemType { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemDto>().ReverseMap();
        }
    }

    public class tblItemLiteDto : IMapFrom
    {
        public string Code { get; set; }

        public string Name { get; set; }

        public virtual tblUnitDto Unit { get; set; }

        public virtual tblItemFormulaDto ItemFormula { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemLiteDto>().ReverseMap();
        }
    }

    public class tblItemUpdateDto : BaseMdDto, IMapFrom, IDto
    {
        public Guid Id { get; set; }

        [Key]
        public string Code { get; set; }

        public string Name { get; set; }

        public string UnitCode { get; set; }

        public string TypeCode { get; set; }

        public double? CostPrice { get; set; }

        public double? SellPrice { get; set; }

        public bool? IsMainObject { get; set; }

        public bool? IsQuantitative { get; set; }

        public virtual tblItemFormulaCreateDto ItemFormula { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<tblMdItem, tblItemUpdateDto>().ReverseMap();
        }
    }
}
