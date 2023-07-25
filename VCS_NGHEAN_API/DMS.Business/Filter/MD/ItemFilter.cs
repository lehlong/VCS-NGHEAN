using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class ItemFilter : BaseFilter
    {
        public string TypeCode { get; set; }
    }

    public class ItemFilterLite
    {
        public string TypeCode { get; set; }

        public bool? IsActive { get; set; }
    }
}
