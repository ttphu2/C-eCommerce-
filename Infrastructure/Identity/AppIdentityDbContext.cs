using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity
{
    //dotnet ef migrations add IdentityInitial -p Infrastructure -s API -o Identity/Migrations -c AppIdentityDbContext
    // -o = output thu muc chua cac migration moi duoc sinh ra
    // -c|--context <DBCONTEXT> the DbContext to use.
    // -s|--startup-project <PROJECT> The startup project to use. Defaults to the current working directory.
    // -p|--project <PROJECT>  The project to use. Defaults to the current working directory.

    public class AppIdentityDbContext : IdentityDbContext<AppUser, AppRole, string>
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        public AppIdentityDbContext(DbContextOptions<AppIdentityDbContext> options, IHttpContextAccessor httpContextAccessor) : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {

            base.OnModelCreating(builder);
        }
        public override Task<int> SaveChangesAsync(
            bool acceptAllChangesOnSuccess,
            CancellationToken cancellationToken = default(CancellationToken))
        {
            AddTimestamps();
            return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
        }
        private void AddTimestamps()
        {
            var entities = ChangeTracker.Entries().Where(x => x.Entity is AppUser && (x.State == EntityState.Added || x.State == EntityState.Modified));

            // var userId = _httpContextAccessor.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            // var currentUsername = !string.IsNullOrEmpty(userId)
            //     ? userId
            //     : "Anonymous";

            foreach (var entity in entities)
            {
                if (entity.State == EntityState.Added)
                {
                    ((AppUser)entity.Entity).CreatedDate = DateTime.UtcNow;

                }

                ((AppUser)entity.Entity).ModifiedDate = DateTime.UtcNow;
                // ((AppUser)entity.Entity).ModifiedBy = currentUsername;
            }
        }
    }
}