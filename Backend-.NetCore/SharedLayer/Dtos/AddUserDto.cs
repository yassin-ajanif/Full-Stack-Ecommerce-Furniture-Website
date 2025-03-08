using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLayer.Dtos
{
    public class AddUserDto
    {
        // Username of the new user
        [Required]
        [StringLength(256, MinimumLength = 3)]
        public string Username { get; set; }

        // Email of the new user (optional but common for registration)
        [Required]
        [EmailAddress]
        public string Email { get; set; }

        // Password of the new user
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }

        // Additional fields can be added here (e.g., first name, last name, etc.)
    }

}
