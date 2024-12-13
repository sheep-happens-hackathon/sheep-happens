using Microsoft.EntityFrameworkCore;
using SheepHappens.Api.Common.Interfaces;
using SheepHappens.Api.Persistence;

namespace SheepHappens.Api
{
    public static class DependencyInjection
    {
        public static IServiceCollection RegisterDbContext(this IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("Main");
            services.AddDbContext<IRepository, MainDbContext>(options =>
            {
                options.UseNpgsql(connectionString);
            });
            return services;
        }
    }
}
