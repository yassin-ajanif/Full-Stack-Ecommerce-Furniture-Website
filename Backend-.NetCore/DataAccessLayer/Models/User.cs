using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace DataAccessLayer.Models
{
    [Index(nameof(Email), IsUnique = true)]
    public class User : IdentityUser
    {
        
        [ProtectedPersonalData]
        public override string? Email { get; set; }
    }
}
