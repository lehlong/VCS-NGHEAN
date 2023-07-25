using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class DriversFilter : BaseFilter
    {
    }

    public class DriversFilterLite
    {
        public bool? IsActive { get; set; }
    }
}
