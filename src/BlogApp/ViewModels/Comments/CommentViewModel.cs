namespace BlogApp.ViewModels.Comments
{
    using System;
    using System.Collections.Generic;

    public class CommentViewModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string AuthorName { get; set; }

        public string RepliedToAuthorName { get; set; }

        public bool IsReply { get; set; }

        public string AuthorId { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime LastModified { get; set; }

        public IEnumerable<CommentViewModel> Replies { get; set; }
    }
}
