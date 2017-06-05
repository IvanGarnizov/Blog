namespace BlogApp.Data.Models
{
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

    public class User : IdentityUser
    {
        public User()
        {
            Posts = new HashSet<Post>();
            Comments = new HashSet<Comment>();
        }

        public virtual ICollection<Post> Posts { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
