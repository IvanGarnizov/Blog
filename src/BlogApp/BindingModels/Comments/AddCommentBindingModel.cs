namespace BlogApp.BindingModels.Comments
{
    public class AddCommentBindingModel
    {
        public int? PostId { get; set; }

        public int? CommentId { get; set; }

        public string Content { get; set; }
    }
}
