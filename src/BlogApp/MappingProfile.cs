namespace BlogApp
{
    using AutoMapper;

    using Data.Models;

    using ViewModels.Comments;
    using ViewModels.Posts;
    using ViewModels.Topics;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostListViewModel>();
            CreateMap<Post, PostViewModel>()
                .ForMember("AuthorName", cfg => cfg.MapFrom(p => p.Author.UserName))
                .ForMember("TopicName", cfg => cfg.MapFrom(p => p.Topic.Name));
            CreateMap<Comment, CommentViewModel>()
                .ForMember("AuthorName", cfg => cfg.MapFrom(c => c.Author.UserName))
                .ForMember("RepliedToAuthorName", cfg => cfg.MapFrom(c => c.RepliedTo.Author.UserName))
                .ForMember("IsReply", cfg => cfg.MapFrom(c => c.RepliedTo != null));
            CreateMap<Topic, TopicListViewModel>();
            CreateMap<Topic, TopicViewModel>();
        }
    }
}
