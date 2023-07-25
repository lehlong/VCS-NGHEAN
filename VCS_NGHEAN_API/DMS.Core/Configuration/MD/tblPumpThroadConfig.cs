using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DMS.CORE.Entities.AD;
using DMS.CORE.Entities.MD;

namespace DMS.CORE.Configuration.MD
{
    public class tblPumpThroatConfig : IEntityTypeConfiguration<tblMdPumpThroat>
    {
        public void Configure(EntityTypeBuilder<tblMdPumpThroat> builder)
        {
            builder.HasOne<tblMdArea>(x => x.Area)
                .WithMany(g => g.ListPumpThroat)
                .HasForeignKey(x => x.AreaCode)
                .OnDelete(DeleteBehavior.SetNull);
            builder.HasOne<tblMdGoods>(x => x.Goods)
                .WithMany(g => g.ListPumpThroat)
                .HasForeignKey(x => x.GoodsCode)
                .OnDelete(DeleteBehavior.SetNull);
            builder.HasOne<tblMdPumpRig>(x => x.PumpRig)
                .WithMany(g => g.ListPumpThroat)
                .HasForeignKey(x => x.PumpRigCode)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
