using DMS.BUSINESS.Common;
using DMS.BUSINESS.Dtos.SO.OrderExport;

namespace DMS.BUSINESS.Dtos.SO.Order
{
    public class DebtCloseDto : IDto
    {
        public string OrderCode { get; set; }

        public DateTime? ExportDate { get; set; }

        public double? DisCount { get; set; } = 0;

        public double? TaxVAT { get; set; } = 0;

        public double? PayMoney { get; set; }

        public List<OrderDetailDebtCloseDto> OrderDetails { get; set; }
    }

}
