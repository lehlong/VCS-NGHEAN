using DMS.CORE;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace DMS.BUSINESS.Common.SO
{
    public static class CountNumberOrder
    {
        public static int CurrentNumberOrder { get; set; } = GetCurrentNumberOrder();
        public static int CurrentNumberExport { get; set; } = GetCurrentNumberExport();
        public static int CurrentNumberRelease { get; set; } = GetCurrentNumberRelease();

        private static int GetCurrentNumberOrder()
        {
            using var context = new AppDbContext(GetContextOption(),null);
            return context.tblSoOrder.AsNoTracking().Count();
        }

        private static int GetCurrentNumberExport()
        {
            using var context = new AppDbContext(GetContextOption(), null);
            return context.tblSoExport.AsNoTracking().Count();
        }

        private static int GetCurrentNumberRelease ()
        {
            using var context = new AppDbContext(GetContextOption(), null);
            return context.tblSoOrderRelease.AsNoTracking().Count();
        }

        private static DbContextOptions<AppDbContext> GetContextOption()
        {
            var configuration = new ConfigurationBuilder()
                             .SetBasePath(Directory.GetCurrentDirectory())
                             .AddJsonFile("appsettings.json")
                             .Build();
            var connectionString = configuration.GetConnectionString("Connection");
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseSqlServer(connectionString)
                .Options;
            return options;
        }
    }
}
