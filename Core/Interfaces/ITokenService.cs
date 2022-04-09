using System.Security.Claims;
using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface ITokenService
    {
       // string CreateToken(AppUser user);
        Task<Tokens> CreateToken(AppUser user);
        Task<Tokens> GenerateRefreshToken(AppUser user);
	    ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}