namespace BlogApp.Data.Models
{
    using System.Collections.Generic;

    public class Topic
    {
        public Topic()
        {
            Posts = new HashSet<Post>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Post> Posts { get; set; }
    }
}
