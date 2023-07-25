using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Configuration.MD
{
    public class tblMdUserTypeConfig : IEntityTypeConfiguration<tblMdUserType>
    {
        public void Configure(EntityTypeBuilder<tblMdUserType> builder)
        {
            builder.HasMany<tblAdAccount>(x => x.ListAccount).WithOne(y => y.AccountType).HasForeignKey(x => x.UserType).OnDelete(DeleteBehavior.SetNull);
        }
    }
}
