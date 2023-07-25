namespace DMS.BUSINESS.Filter.Common
{
    public class OrderScaleFilter : BaseFilter
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public List<string> States { get; set; }
        public string PartnerCode { get; set; }
    }
}
