using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using DMS.CORE.Common;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.BU;
using DMS.CORE.Entities.MD;
using DMS.CORE.Entities.SO;
using System.IdentityModel.Tokens.Jwt;
using DMS.CORE.Entities.WS;

namespace DMS.CORE
{
    public class AppDbContext : DbContext
    {
        protected IHttpContextAccessor HttpContextAccessor { get; }
        public AppDbContext(DbContextOptions<AppDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            this.HttpContextAccessor = httpContextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyAllConfigurations();
            foreach (var type in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(ISoftDeleteEntity).IsAssignableFrom(type.ClrType))
                    modelBuilder.SetSoftDeleteFilter(type.ClrType);
            }
            base.OnModelCreating(modelBuilder);
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies(false);
        }

        public string UserProvider
        {
            get
            {
                //TODO
                return "";
            }
        }

        public Func<DateTime> TimestampProvider { get; set; } = ()
            => DateTime.Now;

        public override int SaveChanges()
        {
            TrackChanges();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            TrackChanges();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void TrackChanges()
        {
            var token = HttpContextAccessor?.HttpContext?.Request?.Headers["Authorization"].ToString()?.Split(" ")?.ToList();
            var user = "System";
            if (token != null && token.Count > 1)
            {
                JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
                JwtSecurityToken securityToken = (JwtSecurityToken)tokenHandler.ReadToken(token[1]);
                var claim = securityToken.Claims;
                var result = claim.FirstOrDefault(x => x.Type == "username");
                user = result?.Value;
            }

            foreach (var entry in this.ChangeTracker.Entries().Where(e => e.State == EntityState.Added || e.State == EntityState.Modified))
            {
                if (entry.Entity is IBaseEntity)
                {
                    var auditable = entry.Entity as IBaseEntity;
                    if (entry.State == EntityState.Added)
                    {
                        auditable.CreateBy = user;
                        auditable.CreateDate = TimestampProvider();
                    }
                    else
                    {
                        this.Entry(auditable).Property(x => x.CreateBy).IsModified = false;
                        this.Entry(auditable).Property(x => x.CreateDate).IsModified = false;
                        auditable.UpdateBy = user;
                        auditable.UpdateDate = TimestampProvider();
                    }
                }

                if (entry.Entity is ISoftDeleteEntity)
                {
                    var entity = entry.Entity as ISoftDeleteEntity;
                    entity.IsDeleted = false;
                }
            }

            foreach (var entry in this.ChangeTracker.Entries().Where(e => e.State == EntityState.Deleted))
            {
                if (entry.Entity is ISoftDeleteEntity)
                {
                    var deleteEntity = entry.Entity as ISoftDeleteEntity;
                    entry.State = EntityState.Unchanged;
                    deleteEntity.IsDeleted = true;
                    deleteEntity.DeleteBy = user;
                    deleteEntity.DeleteDate = TimestampProvider();
                }
            }
        }

        #region System Manage
        public DbSet<tblAdAccount> tblAdAccount { get; set; }
        public DbSet<tblAdAccountGroup> tblAdAccountGroup { get; set; }
        public DbSet<tblAdMenu> tblAdMenu { get; set; }
        public DbSet<tblAdRight> tblAdRight { get; set; }
        public DbSet<tblAdMessage> tblAdMessage { get; set; }
        public DbSet<tblAdAccountGroupRight> tblAdAccountGroupRight { get; set; }
        public DbSet<tblSoOrderProcess> tblSoOrderProcess { get; set; }
        public DbSet<tblSoOrderRelease> tblSoOrderRelease { get; set; }
        public DbSet<tblSoOrderReleaseProcess> tblSoOrderReleaseProcess { get; set; }
        #endregion

        #region Master Data
        public DbSet<tblMdItem> tblMdItem { get; set; }
        public DbSet<tblMdUnit> tblMdUnit { get; set; }
        public DbSet<tblMdItemType> tblMdItemType { get; set; }
        public DbSet<tblMdPartner> tblMdPartner { get; set; }
        public DbSet<tblMdOrderType> tblMdOrderType { get; set; }
        public DbSet<tblMdMixer> tblMdMixer { get; set; }


        public DbSet<tblMdArea> tblMdArea { get; set; }
        public DbSet<tblMdCamera> tblMdCamera { get; set; }
        public DbSet<tblMdUserType> tblMdUserType { get; set; }
        public DbSet<tblMdPumpRig> tblMdPumpRig { get; set; }
        public DbSet<tblMdPumpThroat> tblMdPumpThroat { get; set; }
        public DbSet<tblMdGoods> tblMdGoods { get; set; }
        public DbSet<tblMdDrivers> tblMdDrivers { get; set; }


        public DbSet<tblMdDepartment> tblMdDepartment { get; set; }
        public DbSet<tblMdVehicle> tblMdVehicle { get; set; }
        public DbSet<tblMdDevice> tblMdDevice { get; set; }
        public DbSet<tblMdDeviceGroup> tblMdDeviceGroup { get; set; }
        public DbSet<tblMdDeviceType> tblMdDeviceType { get; set; }
        public DbSet<tblMdNotificationTemplate> tblMdNotificationTemplate { get; set; }

        #endregion

        #region Sale Order
        public DbSet<tblSoOrder> tblSoOrder { get; set; }
        public DbSet<tblSoOrderDetail> tblSoOrderDetail { get; set; }
        public DbSet<tblSoExport> tblSoExport { get; set; }
        public DbSet<tblSoExportDetail> tblSoExportDetail { get; set; }
        public DbSet<tblSoScale> tblSoScale { get; set; }

        #endregion

        #region Bussiness Unit
        public DbSet<tblBuCustomerCare> tblBuCustomerCare { get; set; }
        public DbSet<tblBuItemFormula> tblBuItemFormula { get; set; }
        public DbSet<tblBuNotification> tblBuNotification { get; set; }

        public DbSet<tblBuCurrentCheckIn> tblBuCurrentCheckIn { get; set; }
        public DbSet<tblBuCheckInOut> tblBuCheckInOut { get; set; }
        public DbSet<tblBuCheckInOutImage> tblBuCheckInOutImage { get; set; }
        public DbSet<tblBuAttachment> tblBuAttachment { get; set; }
        #endregion

        #region Workspace
        public DbSet<tblWsCheckIn> tblWsCheckIn { get; set; }

        #endregion
    }
}
