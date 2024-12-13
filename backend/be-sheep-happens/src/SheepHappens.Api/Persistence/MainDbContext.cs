using Microsoft.EntityFrameworkCore;
using SheepHappens.Api.Common.Interfaces;
using SheepHappens.Api.Persistence.Entities;
using System.Reflection;

namespace SheepHappens.Api.Persistence
{
    public class MainDbContext : DbContext, IRepository
    {
        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Tree> Trees { get; set; }
        public DbSet<Node> Nodes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
            base.OnModelCreating(modelBuilder);
        }
    }
}
