using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Configuration.AD
{
    public class tblAdAccountConfig : IEntityTypeConfiguration<tblAdAccount>
    {
        public void Configure(EntityTypeBuilder<tblAdAccount> builder)
        {
            builder.HasOne<tblAdAccountGroup>(x => x.AccountGroup)
                .WithMany(g => g.ListAccount)
                .HasForeignKey(x => x.GroupId)
                .OnDelete(DeleteBehavior.SetNull);
            builder.HasOne<tblMdUserType>(x => x.AccountType)
                .WithMany(g => g.ListAccount)
                .HasForeignKey(x => x.UserType)
                .OnDelete(DeleteBehavior.SetNull);
            builder.HasOne<tblMdArea>(x => x.Area)
                .WithMany(g => g.ListAccount)
                .HasForeignKey(x => x.AreaCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
