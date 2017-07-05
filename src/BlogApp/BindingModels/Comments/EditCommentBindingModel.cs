namespace BlogApp.BindingModels.Comments
{
    public class EditCommentBindingModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public int PostId { get; set; }
    }
}
