namespace BlogApp.Classes
{
    using System;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using System.Threading.Tasks;

    using Data;
    using Data.Models;

    using Microsoft.AspNetCore.Builder;
    using Microsoft.AspNetCore.Http;
    using Microsoft.AspNetCore.Identity;
    using Microsoft.IdentityModel.Tokens;

    using Newtonsoft.Json;

    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class JwtProvider
    {
        private readonly RequestDelegate _next;

        // JWT-related members
        private TimeSpan tokenExpiration;
        private SigningCredentials signingCredentials;

        // EF Identity members, available through DI
        private ApplicationDbContext context;
        private UserManager<User> userManager;
        private SignInManager<User> signInManager;

        private static readonly string privateKey = "private_key_1234567890";
        public static readonly SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(privateKey));
        public static readonly string issuer = "BlogApp";
        public static string tokenEndPoint = "/api/connect/token";

        public JwtProvider(RequestDelegate next, ApplicationDbContext context, UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _next = next;

            // Instantiate JWT-related members
            tokenExpiration = TimeSpan.FromMinutes(10);
            signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Instantiate through Dependency Injection
            this.context = context;
            this.userManager = userManager;
            this.signInManager = signInManager;
        }

        public Task Invoke(HttpContext httpContext)
        {
            if (!httpContext.Request.Path.Equals(tokenEndPoint, StringComparison.Ordinal))
            {
                return _next(httpContext);
            }

            if (httpContext.Request.Method.Equals("POST") && httpContext.Request.HasFormContentType)
            {
                return CreateToken(httpContext);
            }
            else
            {
                httpContext.Response.StatusCode = 400;

                return httpContext.Response.WriteAsync("Bad request.");
            }
        }

        private async Task CreateToken(HttpContext httpContext)
        {
            try
            {
                string username = httpContext.Request.Form["username"];
                string password = httpContext.Request.Form["password"];
                
                var user = await userManager.FindByNameAsync(username);
                
                if (user ==  null && username.Contains("@"))
                {
                    user = await userManager.FindByEmailAsync(username);
                }

                var success = user != null && await userManager.CheckPasswordAsync(user, password);

                if (success)
                {
                    DateTime now = DateTime.UtcNow;
                    
                    var claims = new[]
                    {
                        new Claim(JwtRegisteredClaimNames.Iss, issuer),
                        new Claim(JwtRegisteredClaimNames.Sub, user.Id),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, new DateTimeOffset(now).ToUnixTimeSeconds().ToString(), ClaimValueTypes.Integer64)
                    };
                    var token = new JwtSecurityToken(
                        claims: claims,
                        notBefore: now,
                        expires: now.Add(tokenExpiration),
                        signingCredentials: signingCredentials);
                    var encodedToken = new JwtSecurityTokenHandler().WriteToken(token);
                    var jwt = new
                    {
                        access_token = encodedToken,
                        expiration = (int)tokenExpiration.TotalSeconds
                    };


                    httpContext.Response.ContentType = "application/json";

                    await httpContext.Response.WriteAsync(JsonConvert.SerializeObject(jwt));

                    return;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }

            httpContext.Response.StatusCode = 400;

            await httpContext.Response.WriteAsync("Invalid username or password.");
        }
    }

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class JwtProviderExtensions
    {
        public static IApplicationBuilder UseJwtProvider(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<JwtProvider>();
        }
    }
}
