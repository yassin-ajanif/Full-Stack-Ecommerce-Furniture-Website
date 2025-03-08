using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLayer.Dtos
{
    public class LoginUserDto
    {
        // Username or email of the user attempting to log in
        [Required]
        public string UsernameOrEmail { get; set; }

        // Password of the user
        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; }
    }

}
