namespace BlogApp.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Mvc;

    using ViewModels.Posts;

    public class UsersController : BaseController
    {
        public UsersController(ApplicationDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }

        [HttpGet("Posts")]
        public IActionResult GetPosts()
        {
            var posts = context.Posts
                .Where(p => p.Author.UserName == "admin");
            var postModels = mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts);

            return new JsonResult(postModels);
        }
    }
}
