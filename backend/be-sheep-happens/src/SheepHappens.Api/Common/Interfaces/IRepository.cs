using Microsoft.EntityFrameworkCore;
using SheepHappens.Api.Persistence.Entities;

namespace SheepHappens.Api.Common.Interfaces
{
    public interface IRepository
    {
        public DbSet<User> Users { get; }
        public DbSet<Tree> Trees { get; }
        public DbSet<Node> Nodes { get; }

        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}
