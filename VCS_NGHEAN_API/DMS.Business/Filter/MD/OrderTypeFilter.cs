using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class OrderTypeFilter : BaseFilter
    {
    }

    public class OrderTypeFilterLite
    {
        public bool? IsActive { get; set; }
    }
}
