namespace BlogApp
{
    using AutoMapper;

    using Data.Models;

    using ViewModels.Posts;

    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Post, PostListViewModel>();
            CreateMap<Post, PostViewModel>()
                .ForMember("AuthorName", cfg => cfg.MapFrom(p => p.Author.UserName));
            CreateMap<Comment, CommentViewModel>()
                .ForMember("AuthorName", cfg => cfg.MapFrom(c => c.Author.UserName));
        }
    }
}
