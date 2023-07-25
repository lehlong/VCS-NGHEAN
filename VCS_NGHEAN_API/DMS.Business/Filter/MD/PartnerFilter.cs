using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class PartnerFilter : BaseFilter
    {
        public bool? IsCustomer { get; set; }
        public bool? IsProvider { get; set; }
    }

    public class PartnerFilterLite
    {
        public bool? IsActive { get; set; }
        public bool? IsCustomer { get; set; }
        public bool? IsProvider { get; set; }
    }
}
