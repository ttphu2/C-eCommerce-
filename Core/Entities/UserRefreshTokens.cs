using System.ComponentModel.DataAnnotations;

namespace Core.Entities
{
    public class UserRefreshTokens : BaseEntity
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string RefreshToken { get; set; }
        public bool IsActive { get; set; } = true;
    }
}