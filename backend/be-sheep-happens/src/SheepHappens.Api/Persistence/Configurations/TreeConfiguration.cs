using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SheepHappens.Api.Persistence.Entities;

namespace SheepHappens.Api.Persistence.Configurations
{
    public class TreeConfiguration : IEntityTypeConfiguration<Tree>
    {
        public void Configure(EntityTypeBuilder<Tree> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder
                .HasMany(x => x.Nodes)
                .WithOne(x => x.Tree)
                .HasForeignKey(x => x.TreeId);
        }
    }
}
