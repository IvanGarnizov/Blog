namespace BlogApp.BindingModels.Posts
{
    public class AddPostBindingModel
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public int TopicId { get; set; }
    }
}
