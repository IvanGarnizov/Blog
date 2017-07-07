namespace BlogApp
{
    using System.Collections.Generic;
    using System.Linq;

    using Data;
    using Data.Models;

    using Microsoft.EntityFrameworkCore;

    public static class Utility
    {
        public static void DeleteReplies(int commentId, ApplicationDbContext context)
        {
            foreach (var reply in GetReplies(commentId, context))
            {
                context.Comments.Remove(reply);
            }

            context.SaveChanges();
        }

        public static void DeleteComments(IEnumerable<Comment> comments, ApplicationDbContext context)
        {
            foreach (var comment in comments.ToList())
            {
                DeleteReplies(comment.Id, context);
                context.Comments.Remove(comment);
            }

            context.SaveChanges();
        }

        public static void DeletePosts(IEnumerable<Post> posts, ApplicationDbContext context)
        {
            foreach (var post in posts.ToList())
            {
                DeleteComments(post.Comments, context);
                context.Posts.Remove(post);
            }

            context.SaveChanges();
        }

        public static ICollection<Comment> GetReplies(int id, ApplicationDbContext context)
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
                    replies.AddRange(GetReplies(reply.Id, context));
                }
            }

            return replies;
        }
    }
}
