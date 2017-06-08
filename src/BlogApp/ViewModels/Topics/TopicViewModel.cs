namespace BlogApp.ViewModels.Topics
{
    using System.Collections.Generic;

    using Posts;

    public class TopicViewModel
    {
        public string Name { get; set; }

        public IEnumerable<PostViewModel> Posts { get; set; }
    }
}
