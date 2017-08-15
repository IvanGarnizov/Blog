namespace BlogApp.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using BindingModels.Posts;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    using ViewModels.Posts;

    public class PostsController : BaseController
    {
        public PostsController(ApplicationDbContext context, IMapper mapper, SignInManager<User> signInManager, UserManager<User> userManager)
            : base(context, mapper, signInManager, userManager)
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
                .Include(p => p.Topic)
                .Include(p => p.Author)
                .First(p => p.Id == id);
            var postModel = mapper.Map<Post, PostViewModel>(post);

            return new JsonResult(postModel);
        }

        [HttpGet("GetForCurrentUser")]
        [Authorize]
        public IActionResult GetForCurrentUser()
        {
            var posts = context.Posts
                .Where(p => p.Author.Id == CurrentUserId());
            var postModels = mapper.Map<IEnumerable<Post>, IEnumerable<PostListViewModel>>(posts);

            return new JsonResult(postModels);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Add([FromBody]AddPostBindingModel model)
        {
            var newPost = new Post()
            {
                Title = model.Title,
                Content = model.Content,
                CreationTime = DateTime.Now,
                LastModified = DateTime.Now,
                AuthorId = CurrentUserId(),
                TopicId = model.TopicId
            };

            context.Posts.Add(newPost);
            context.SaveChanges();

            return new JsonResult(newPost.Id);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var post = context.Posts
                .Include(p => p.Comments)
                .First(p => p.Id == id);
            
            Utility.DeleteComments(post.Comments, context);

            context.Posts.Remove(post);
            context.SaveChanges();

            return Ok();
        }

        [HttpPut]
        [Authorize]
        public IActionResult Edit([FromBody]EditPostBindingModel model)
        {
            var post = context.Posts
                .First(p => p.Id == model.Id);

            post.Title = model.Title;
            post.Content = model.Content;
            post.TopicId = model.TopicId;
            context.SaveChanges();

            return Ok();
        }
    }
}
