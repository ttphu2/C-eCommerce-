using Core.Entities;

namespace Core.Specifications
{
    public class TokenSavedWithUsernameAndRefreshTokenSpecification : BaseSpecification<UserRefreshTokens>
    {
        public TokenSavedWithUsernameAndRefreshTokenSpecification(string username, string refreshToken) : base(x => x.UserName == username && x.RefreshToken == refreshToken)
        {

        }
    }
}