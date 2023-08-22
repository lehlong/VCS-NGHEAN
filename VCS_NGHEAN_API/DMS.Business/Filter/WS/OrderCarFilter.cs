using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.WS
{
    public class OrderCarFilter : BaseFilter
    {

    }

    public class OrderCarFilterLite
    {
        public bool? IsActive { get; set; }
    }
}