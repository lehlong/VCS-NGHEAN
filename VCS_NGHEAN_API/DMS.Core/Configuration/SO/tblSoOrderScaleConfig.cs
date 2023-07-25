using DMS.CORE.Entities.SO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace DMS.CORE.Configuration.SO
{
    internal class tblSoOrderScaleConfig : IEntityTypeConfiguration<tblSoScale>
    {
        public void Configure(EntityTypeBuilder<tblSoScale> builder)
        {
            builder.HasOne(x => x.OrderRelease).WithOne().IsRequired(false);
        }
    }
}
