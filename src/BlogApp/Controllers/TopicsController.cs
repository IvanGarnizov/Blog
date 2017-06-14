namespace BlogApp.Controllers
{
    using System.Collections.Generic;
    using System.Linq;

    using AutoMapper;

    using BindingModels.Topics;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    using ViewModels.Topics;

    public class TopicsController : BaseController
    {
        public TopicsController(ApplicationDbContext context, IMapper mapper)
            : base(context, mapper)
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
            var topics = context.Topics;

            topics.Add(new Topic()
            {
                Name = model.Name
            });
            context.SaveChanges();

            var topicModels = mapper.Map<IEnumerable<Topic>, IEnumerable<TopicListViewModel>>(topics);

            return new JsonResult(topicModels);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var topic = context.Topics
                .First(t => t.Id == id);

            context.Topics.Remove(topic);
            context.SaveChanges();

            var topics = context.Topics;
            var topicModels = mapper.Map<IEnumerable<Topic>, IEnumerable<TopicListViewModel>>(topics);

            return new JsonResult(topicModels);
        }
    }
}
