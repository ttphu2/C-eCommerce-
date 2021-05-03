using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UserToUpdateDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string FirstName { get; set; }
        [Required]
        public string LastName { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        [Phone]
        public string Phone { get; set; }
    }
}