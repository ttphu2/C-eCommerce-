using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity
{
    //dotnet ef migrations add IdentityInitial -p Infrastructure -s API -o Identity/Migrations -c AppIdentityDbContext
    // -o = output thu muc chua cac migration moi duoc sinh ra
    // -c|--context <DBCONTEXT> the DbContext to use.
    // -s|--startup-project <PROJECT> The startup project to use. Defaults to the current working directory.
    // -p|--project <PROJECT>  The project to use. Defaults to the current working directory.

    public class AppIdentityDbContext : IdentityDbContext<AppUser>
    {
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}