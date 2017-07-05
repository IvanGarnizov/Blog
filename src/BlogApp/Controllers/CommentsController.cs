namespace BlogApp.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using BindingModels.Comments;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    using ViewModels.Comments;

    public class CommentsController : BaseController
    {
        public CommentsController(ApplicationDbContext context, IMapper mapper)
            : base(context, mapper)
        {
        }

        [HttpPost]
        public IActionResult Add([FromBody]AddCommentBindingModel model)
        {
            var newComment = new Comment()
            {
                Content = model.Content,
                CreationTime = DateTime.Now,
                LastModified = DateTime.Now,
                AuthorId = context.Users.First(u => u.UserName == "admin").Id
            };

            IEnumerable<CommentViewModel> commentModels = null;

            if (model.CommentId != null)
            {
                newComment.RepliedToId = model.CommentId;
                context.Comments.Add(newComment);
                context.SaveChanges();

                int postId = GetPostId(newComment.Id);
                var post = context.Posts
                    .Include(p => p.Comments)
                        .ThenInclude(c => c.Author)
                    .First(p => p.Id == postId);

                foreach (var comment in post.Comments)
                {
                    comment.Replies = GetReplies(comment.Id);
                    comment.Replies = comment.Replies
                        .OrderBy(c => c.CreationTime)
                        .ToList();
                }

                post.Comments = post.Comments
                    .OrderBy(c => c.CreationTime)
                    .ToList();

                commentModels = mapper.Map<IEnumerable<Comment>, IEnumerable<CommentViewModel>>(post.Comments);
            }
            else
            {
                newComment.PostId = model.PostId;
                context.Comments.Add(newComment);
                context.SaveChanges();

                var comment = context.Comments
                    .Include(c => c.Post)
                        .ThenInclude(p => p.Comments)
                            .OrderBy(c => c.CreationTime)
                    .Include(c => c.Post)
                        .ThenInclude(p => p.Comments)
                            .ThenInclude(c => c.Author)
                    .First(c => c.Id == newComment.Id);

                foreach (var postComment in comment.Post.Comments)
                {
                    postComment.Replies = GetReplies(postComment.Id);
                }

                commentModels = mapper.Map<IEnumerable<Comment>, IEnumerable<CommentViewModel>>(comment.Post.Comments);
            }

            return new JsonResult(commentModels);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var comment = context.Comments
                .Include(c => c.Post)
                    .ThenInclude(p => p.Comments)
                        .ThenInclude(c => c.Author)
                .First(c => c.Id == id);
            int postId = GetPostId(comment.Id);

            comment.Replies = GetReplies(comment.Id);

            foreach (var reply in comment.Replies)
            {
                context.Comments.Remove(reply);
            }

            context.SaveChanges();
            context.Comments.Remove(comment);
            context.SaveChanges();

            IEnumerable<CommentViewModel> commentModels = null;

            if (comment.Post == null)
            {
                var post = context.Posts
                    .Include(p => p.Comments)
                        .OrderBy(c => c.CreationTime)
                    .Include(p => p.Comments)
                        .ThenInclude(c => c.Author)
                    .First(p => p.Id == postId);

                foreach (var postComment in post.Comments)
                {
                    postComment.Replies = GetReplies(postComment.Id)
                        .OrderBy(r => r.CreationTime)
                        .ToList();
                }

                post.Comments = post.Comments
                    .OrderBy(c => c.CreationTime)
                    .ToList();

                commentModels = mapper.Map<IEnumerable<Comment>, IEnumerable<CommentViewModel>>(post.Comments);
            }
            else
            {
                foreach (var postComment in comment.Post.Comments)
                {
                    postComment.Replies = GetReplies(postComment.Id);
                }

                commentModels = mapper.Map<IEnumerable<Comment>, IEnumerable<CommentViewModel>>(comment.Post.Comments);
            }

            return new JsonResult(commentModels);
        }

        [HttpPut]
        public IActionResult Edit([FromBody]EditCommentBindingModel model)
        {
            var comment = context.Comments
                .First(c => c.Id == model.Id);

            comment.Content = model.Content;
            context.SaveChanges();

            return new JsonResult(Get(GetPostId(comment.Id)).OrderBy(c => c.CreationTime));
        }

        private IEnumerable<CommentViewModel> Get(int postId)
        {
            var comments = context.Posts
                .Include(p => p.Comments)
                    .ThenInclude(c => c.Author)
                .First(p => p.Id == postId)
                .Comments;

            foreach (var comment in comments)
            {
                comment.Replies = GetReplies(comment.Id)
                    .OrderBy(c => c.CreationTime)
                    .ToList();
            }

            var commentModels = mapper.Map<IEnumerable<Comment>, IEnumerable<CommentViewModel>>(comments);

            return commentModels;
        }

        private ICollection<Comment> GetReplies(int id)
        {
            List<Comment> replies = new List<Comment>();

            var comment = context.Comments
                .Include(c => c.Replies)
                .First(c => c.Id == id);

            if (comment.Replies.Count > 0)
            {
                replies.AddRange(comment.Replies);

                foreach (var reply in comment.Replies)
                {
                    replies.AddRange(GetReplies(reply.Id));
                }
            }

            return replies;
        }

        private int GetPostId(int id)
        {
            int postId = 0;
            var comment = context.Comments
                .Include(c => c.Post)
                .First(c => c.Id == id);

            if (comment.Post == null)
            {
                postId = GetPostId((int)comment.RepliedToId);
            }
            else
            {
                postId = (int)comment.PostId;
            }

            return postId;
        }
    }
}
