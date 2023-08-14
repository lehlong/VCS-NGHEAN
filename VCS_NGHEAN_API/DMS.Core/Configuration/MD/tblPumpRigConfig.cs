using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Configuration.MD
{
    public class tblPumpRigConfig : IEntityTypeConfiguration<tblMdPumpRig >
    {
        public void Configure(EntityTypeBuilder<tblMdPumpRig> builder)
        {
            builder.HasOne<tblMdArea>(x => x.Area)
                .WithMany(g => g.ListPumpRig)
                .HasForeignKey(x => x.AreaCode)
                .OnDelete(DeleteBehavior.SetNull).IsRequired(false);
        }
    }
}
