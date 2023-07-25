using DMS.BUSINESS.Filter.Common;

namespace DMS.BUSINESS.Filter.MD
{
    public class VehicleFilter : BaseFilter
    {
    }

    public class VehicleFilterLite
    {
        public bool? IsActive { get; set; }
    }
}
