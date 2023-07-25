using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class DepartmentFilter : BaseFilter
    {
    }

    public class DepartmentFilterLite
    {
        public bool? IsActive { get; set; }
    }
}
