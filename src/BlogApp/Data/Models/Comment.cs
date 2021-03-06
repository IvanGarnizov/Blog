﻿namespace BlogApp.Data.Models
{
    using System;
    using System.Collections.Generic;

    public class Comment
    {
        public Comment()
        {
            Replies = new HashSet<Comment>();
        }

        public int Id { get; set; }

        public string Content { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime LastModified { get; set; }

        public string AuthorId { get; set; }

        public virtual User Author { get; set; }

        public int? PostId { get; set; }

        public virtual Post Post { get; set; }

        public int? RepliedToId { get; set; }

        public virtual Comment RepliedTo { get; set; }

        public virtual ICollection<Comment> Replies { get; set; }
    }
}
