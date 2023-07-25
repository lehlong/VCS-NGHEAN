using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class UserTypeFilter : BaseFilter
    {
    }

    public class UserTypeFilterLite
    {
        public bool? IsActive { get; set; }
    }
}
