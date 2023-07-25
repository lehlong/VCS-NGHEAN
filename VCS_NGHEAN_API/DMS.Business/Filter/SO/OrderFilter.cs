using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.SO
{
    public class OrderFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public List<string> States { get; set; }
        public string PartnerCode { get; set; }
        public string ItemCode { get; set; }
    }
}
