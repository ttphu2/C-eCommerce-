using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class UserManagerExtensions
    {
        //đối tượng này sẽ giữ các thông tin cụ thể về yêu cầu hiện tại như Request, Response, Server, Session, Cache, User, v.v. 
        //Đối với mọi yêu cầu, một HttpContext mới đối tượng sẽ được tạo mà thời gian chạy ASP.Net sẽ sử dụng trong quá trình xử lý yêu cầu. Một đối tượng HttpContext mới sẽ được tạo khi bắt đầu một yêu cầu và bị hủy khi yêu cầu hoàn thành.
        //var email = HttpContext.User?.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        public static async Task<AppUser> FindByUserByClaimsPricipleEmailWithAddressAsync(this UserManager<AppUser> input
        , ClaimsPrincipal user)
        {
            var email = user.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            return await input.Users.Include(x => x.Address)
            .SingleOrDefaultAsync(x => x.Email == email);

        }
        public static async Task<AppUser> FindByEmailFromClaimsPriciple(this UserManager<AppUser> input
        , ClaimsPrincipal user)
        {
            var email = user.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
            return await input.Users
           .SingleOrDefaultAsync(x => x.Email == email);
        }
    }
}