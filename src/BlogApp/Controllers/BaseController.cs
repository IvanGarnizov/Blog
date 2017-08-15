namespace BlogApp.Controllers
{
    using System;
    using System.Security.Claims;

    using AutoMapper;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using Newtonsoft.Json;

    [Route("api/[controller]")]
    public class BaseController : Controller
    {
        protected ApplicationDbContext context;
        protected IMapper mapper;
        protected SignInManager<User> signInManager;
        protected UserManager<User> userManager;

        public BaseController(ApplicationDbContext context, IMapper mapper, SignInManager<User> signInManager, UserManager<User> userManager)
        {
            this.context = context;
            this.mapper = mapper;
            this.signInManager = signInManager;
            this.userManager = userManager;
        }

        protected string CurrentUserId()
        {
            if (!User.Identity.IsAuthenticated)
            {
                throw new NotSupportedException();
            }

            return User.FindFirst(ClaimTypes.NameIdentifier).Value;
        }

        protected JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }
    }
}
