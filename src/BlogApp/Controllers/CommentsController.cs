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
            var post = context.Posts
                .Include(p => p.Comments)
                .First(p => p.Id == model.PostId);

            post.Comments.Add(new Comment()
            {
                Content = model.Content,
                CreationTime = DateTime.Now,
                LastModified = DateTime.Now,
                AuthorId = context.Users.First(u => u.UserName == "admin").Id,
            });
            context.SaveChanges();

            var commentModels = mapper.Map<IEnumerable<Comment>, IEnumerable<CommentViewModel>>(post.Comments);

            return new JsonResult(commentModels);
        }
    }
}
