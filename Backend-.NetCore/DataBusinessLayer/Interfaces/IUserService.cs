using Microsoft.AspNetCore.Identity;
using System;
using SharedLayer.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Models;

namespace DataBusinessLayer.Interfaces
{
    public interface IUserService
    {
        // Register a new user with provided registration details
        Task<IdentityResult> AddUserAsync(AddUserDto userToAddDto);

        // Log in an existing user
        Task<Object> LoginAsync(LoginUserDto loginDto);

        // Change a user's password
        /*Task<IdentityResult> ChangePasswordAsync(IdentityUser user, string oldPassword, string newPassword);

        // Get user details by username
        Task<IdentityUser> GetUserByUsernameAsync(string username);

        // Confirm the email address of the user
        Task<IdentityResult> ConfirmEmailAsync(string userId, string token);*/
    }

}
