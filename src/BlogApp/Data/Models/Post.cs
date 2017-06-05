namespace BlogApp.Data.Models
{
    using System;
    using System.Collections.Generic;

    public class Post
    {
        public Post()
        {
            Comments = new HashSet<Comment>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int ViewsCount { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime LastModified { get; set; }

        public string AuthorId { get; set; }

        public virtual User Author { get; set; }

        public int TopicId { get; set; }

        public virtual Topic Topic { get; set; }

        public virtual ICollection<Comment> Comments { get; set; }
    }
}
