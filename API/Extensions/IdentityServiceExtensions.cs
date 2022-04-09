using System;
using System.Text;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions
{
    public static class IdentityServicesExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
        IConfiguration config)
        {
            // Thêm vào dịch vụ Identity với cấu hình mặc định cho AppUser (model user)
            var builder = services.AddIdentityCore<AppUser>(options => {
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
            });
            builder = new IdentityBuilder(builder.UserType, typeof(AppRole), builder.Services);
            // Thêm triển khai EF lưu trữ thông tin về Idetity (theo AppDbContext -> MS SQL Server).
            builder.AddEntityFrameworkStores<AppIdentityDbContext>();
            builder.AddSignInManager<SignInManager<AppUser>>();
            builder.AddRoleValidator<RoleValidator<AppRole>>();
            builder.AddRoleManager<RoleManager<AppRole>>();


            builder.AddSignInManager<SignInManager<AppUser>>();
            //setting cho identity su dung token
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options => 
                {
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true, // xác minh rằng khóa được sử dụng để ký mã thông báo đến là một phần của danh sách các khóa đáng tin cậy
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"])), //secret key cua chung ta
                        ValidIssuer = config["Token:Issuer"], //Thông tin của server tạo ra AccessToken
                     //   ValidAudience = config["JWT:Audience"], //Thông tin
                        ValidateIssuer = true, //Kiểm tra xem server render của Access Token
                        ValidateAudience = false, //  đảm bảo rằng người nhận mã thông báo được ủy quyền nhận nó
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero // độ lệch đồng hồ nếu để default là 5 phút thì token sẽ token sẽ sống thêm 5p chỉnh về 0 để token đie chính xác
                    };
                    options.Events = new JwtBearerEvents {
                    //add event nếu token hết hạn thì thêm vào response IS-TOKEN-EXPIRED = true
                    // để client có thể biết là gọi refresh token
                    OnAuthenticationFailed = context => {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("IS-TOKEN-EXPIRED", "true");
                        }
                        return Task.CompletedTask;
                    }
                    };
                });
            return services;
        }
    }
}