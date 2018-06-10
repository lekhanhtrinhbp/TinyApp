using App.Data.Model;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace App.Data
{
    public class AppDbContext : IdentityDbContext<User, Role, string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Restaurant> Restaurants { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>().ToTable("Users");
            builder.Entity<Role>().ToTable("Roles");
            builder.Entity<UserRole>(options =>
            {
                options.HasOne(m => m.User).WithMany(m => m.UserRoles).HasForeignKey(m => m.UserId).OnDelete(DeleteBehavior.Cascade);
                options.HasOne(m => m.Role).WithMany(m => m.UserRoles).HasForeignKey(m => m.RoleId).OnDelete(DeleteBehavior.Cascade);
                options.ToTable("UserRoles");
            });
            builder.Entity<IdentityUserLogin<string>>().ToTable("UserLogins");
            builder.Entity<IdentityUserClaim<string>>().ToTable("UserClaims");
            builder.Entity<IdentityUserToken<string>>().ToTable("UserTokens");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("RoleClaims");
            builder.Entity<Restaurant>(options =>
            {
                options.HasKey(m => m.Id);
                options.Property(m => m.Id).UseSqlServerIdentityColumn();
                options.Property(m => m.Name).IsRequired();
            });
        }
    }
}
