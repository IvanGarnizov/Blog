namespace BlogApp.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using BindingModels.Comments;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    using ViewModels.Comments;

    public class CommentsController : BaseController
    {
        public CommentsController(ApplicationDbContext context, IMapper mapper, SignInManager<User> signInManager, UserManager<User> userManager)
            : base(context, mapper, signInManager, userManager)
        {
        }

        [HttpGet("{postId}")]
        public IActionResult Get(int postId)
        {
            var comments = context.Posts
                .Include(p => p.Comments)
                    .ThenInclude(c => c.Author)
                .First(p => p.Id == postId)
                .Comments;

            foreach (var comment in comments)
            {
                comment.Replies = Utility.GetReplies(comment.Id, context)
                    .OrderBy(c => c.CreationTime)
                    .ToList();
            }

            comments = comments
                .OrderBy(c => c.CreationTime)
                .ToList();

            var commentModels = mapper.Map<IEnumerable<Comment>, IEnumerable<CommentViewModel>>(comments);

            return new JsonResult(commentModels);
        }

        [HttpPost]
        public IActionResult Add([FromBody]AddCommentBindingModel model)
        {
            var newComment = new Comment()
            {
                Content = model.Content,
                CreationTime = DateTime.Now,
                LastModified = DateTime.Now,
                AuthorId = CurrentUserId()
            };

            if (model.CommentId != null)
            {
                newComment.RepliedToId = model.CommentId;
            }
            else
            {
                newComment.PostId = model.PostId;
            }

            context.Comments.Add(newComment);
            context.SaveChanges();

            int postId = GetPostId(newComment.Id);

            return Get(postId);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var comment = context.Comments
                .First(c => c.Id == id);
            int postId = GetPostId(comment.Id);

            Utility.DeleteReplies(comment.Id, context);

            context.Comments.Remove(comment);
            context.SaveChanges();

            return Get(postId);
        }

        [HttpPut]
        public IActionResult Edit([FromBody]EditCommentBindingModel model)
        {
            var comment = context.Comments
                .First(c => c.Id == model.Id);

            comment.Content = model.Content;
            context.SaveChanges();

            int postId = GetPostId(comment.Id);

            return Get(postId);
        }

        private int GetPostId(int id)
        {
            var comment = context.Comments
                .Include(c => c.Post)
                .First(c => c.Id == id);

            if (comment.Post == null)
            {
                return GetPostId((int)comment.RepliedToId);
            }
            else
            {
                return (int)comment.PostId;
            }
        }
    }
}
