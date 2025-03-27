using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLayer.Dtos
{
    public class TokenDto
    {
        public string Token { get; set; }
        public DateTime TokenExpiresIn { get; set; }

        // Method to check if the token is expired
        public bool IsExpired()
        {
            return DateTime.UtcNow > TokenExpiresIn;

        }
    }
}