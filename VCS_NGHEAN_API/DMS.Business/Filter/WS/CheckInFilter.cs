using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.WS
{
    public class CheckInFilter : BaseFilter
    {
    }

    public class CheckInFilterLite
    {
        public bool? IsActive { get; set; }
    }
}
