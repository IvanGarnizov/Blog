namespace BlogApp.BindingModels.Posts
{
    public class EditPostBindingModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public int TopicId { get; set; }
    }
}
