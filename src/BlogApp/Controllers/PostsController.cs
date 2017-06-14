namespace BlogApp.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using BindingModels.Posts;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

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
                .Include(p => p.Author)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.RepliedTo)
                        .ThenInclude(c => c.Author)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.Author)
                .First(p => p.Id == id);
            var postModel = mapper.Map<Post, PostViewModel>(post);

            return new JsonResult(postModel);
        }

        [HttpPost]
        public IActionResult Add([FromBody]AddPostBindingModel model)
        {
            if (model.TopicId == 0)
            {
                model.TopicId = 1;
            }

            var newPost = new Post()
            {
                Title = model.Title,
                Content = model.Content,
                CreationTime = DateTime.Now,
                LastModified = DateTime.Now,
                AuthorId = context.Users.First(u => u.UserName == "admin").Id,
                TopicId = model.TopicId
            };

            context.Posts.Add(newPost);
            context.SaveChanges();

            return new JsonResult(newPost.Id);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var post = context.Posts
                .First(p => p.Id == id);

            context.Posts.Remove(post);
            context.SaveChanges();

            return Ok();
        }
    }
}
