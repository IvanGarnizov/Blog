namespace BlogApp.Controllers
{
    using AutoMapper;

    using Data;

    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    public class BaseController : Controller
    {
        protected ApplicationDbContext context;
        protected IMapper mapper;

        public BaseController(ApplicationDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
    }
}
