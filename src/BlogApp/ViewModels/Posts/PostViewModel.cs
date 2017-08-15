namespace BlogApp.ViewModels.Posts
{
    using System;

    public class PostViewModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string AuthorName { get; set; }

        public int TopicId { get; set; }

        public string TopicName { get; set; }

        public int ViewsCount { get; set; }

        public string AuthorId { get; set; }

        public DateTime CreationTime { get; set; }

        public DateTime LastModified { get; set; }
    }
}
