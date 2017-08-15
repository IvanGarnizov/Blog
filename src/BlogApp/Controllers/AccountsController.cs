namespace BlogApp.Controllers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Mvc;

    using BindingModels.Users;

    public class AccountsController : BaseController
    {
        public AccountsController(ApplicationDbContext context, IMapper mapper, SignInManager<User> signInManager, UserManager<User> userManager)
            : base(context, mapper, signInManager, userManager)
        {
        }

        [HttpGet("GetUserId")]
        [Authorize]
        public IActionResult GetUserId()
        {
            return new JsonResult(CurrentUserId());
        }

        [HttpGet("IsAdmin")]
        public async Task<IActionResult> GetIsAdmin()
        {
            return new JsonResult(await userManager.IsInRoleAsync(context.Users.First(u => u.Id == CurrentUserId()), "Admin"));
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromBody]AddUserBindingModel model)
        {
            if (model != null)
            {
                try
                {
                    User user = await userManager.FindByNameAsync(model.Username);

                    if (user != null)
                    {
                        throw new Exception("Username already exists.");
                    }

                    user = await userManager.FindByEmailAsync(model.Email);

                    if (user != null)
                    {
                        throw new Exception("Email already exists.");
                    }

                    user = new User()
                    {
                        UserName = model.Username,
                        Email = model.Email
                    };

                    await userManager.CreateAsync(user, model.Password);

                    return new JsonResult(user);
                }
                catch (Exception e)
                {
                    return new JsonResult(new { Error = e.Message });
                }
            }

            return new StatusCodeResult(500);
        }
    }
}
