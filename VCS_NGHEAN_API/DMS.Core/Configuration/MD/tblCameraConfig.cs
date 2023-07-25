using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Configuration.MD
{
    public class tblCameraConfig : IEntityTypeConfiguration<tblMdCamera>
    {
        public void Configure(EntityTypeBuilder<tblMdCamera> builder)
        {
            builder.HasOne<tblMdArea>(x => x.Area)
                .WithMany(g => g.ListCamera)
                .HasForeignKey(x => x.AreaCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
