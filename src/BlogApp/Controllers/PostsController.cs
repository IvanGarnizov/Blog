namespace BlogApp.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Mvc;

    using ViewModels.Posts;

    public class PostsController : BaseController
    {
        public PostsController(ApplicationDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }

        [HttpGet("MostViewed")]
        public IActionResult GetMostViewed()
        {
            var posts = context.Posts
                .OrderByDescending(p => p.ViewsCount)
                .Take(5);
            var postModels = mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts);

            return new JsonResult(postModels);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var post = context.Posts
                .First(p => p.Id == id);
            var postModel = mapper.Map<Post, PostViewModel>(post);

            return new JsonResult(postModel);
        }
    }
}
