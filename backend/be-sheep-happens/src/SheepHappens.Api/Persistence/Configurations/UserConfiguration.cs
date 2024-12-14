using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SheepHappens.Api.Persistence.Entities;

namespace SheepHappens.Api.Persistence.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).ValueGeneratedOnAdd();

            builder
                .HasMany(x => x.Trees)
                .WithOne(x => x.User)
                .HasForeignKey(x => x.UserId);
        }
    }
}
