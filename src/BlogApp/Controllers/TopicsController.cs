namespace BlogApp.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using BindingModels.Topics;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    using ViewModels.Topics;

    public class TopicsController : BaseController
    {
        public TopicsController(ApplicationDbContext context, IMapper mapper, SignInManager<User> signInManager, UserManager<User> userManager)
            : base(context, mapper, signInManager, userManager)
        {
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var topics = context.Topics;
            var topicModels = mapper.Map<IEnumerable<Topic>, IEnumerable<TopicListViewModel>>(topics);

            return new JsonResult(topicModels);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var topic = context.Topics
                .Include(t => t.Posts)
                .First(t => t.Id == id);
            var topicModel = mapper.Map<Topic, TopicViewModel>(topic);

            return new JsonResult(topicModel);
        }

        [HttpPost]
        public IActionResult Add([FromBody]AddTopicBindingModel model)
        {
            context.Topics.Add(new Topic()
            {
                Name = model.Name
            });
            context.SaveChanges();

            return GetAll();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var topic = context.Topics
                .Include(t => t.Posts)
                    .ThenInclude(p => p.Comments)
                .First(t => t.Id == id);

            Utility.DeletePosts(topic.Posts, context);

            context.Topics.Remove(topic);
            context.SaveChanges();

            return GetAll();
        }

        [HttpPut]
        public IActionResult Edit([FromBody]EditTopicBindingModel model)
        {
            var topic = context.Topics
                .First(t => t.Id == model.Id);

            topic.Name = model.Name;
            context.SaveChanges();

            return GetAll();
        }
    }
}
