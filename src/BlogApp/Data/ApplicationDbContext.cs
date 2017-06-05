namespace BlogApp.Data
{
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;

    using Models;

    public class ApplicationDbContext : IdentityDbContext<User>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options)
        {
        }

        public virtual DbSet<Post> Posts { get; set; }

        public virtual DbSet<Comment> Comments{ get; set; }

        public virtual DbSet<Topic> Topics { get; set; }
    }
}
