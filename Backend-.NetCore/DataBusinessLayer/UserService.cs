using DataAccessLayer.Models;
using DataBusinessLayer.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SharedLayer.Dtos;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace DataBusinessLayer
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> _userManager;  // Use the custom User class
        private readonly SignInManager<User> _signInManager;  // Use the custom User class
        private readonly IConfiguration _configuration;  // Use the custom User class

        // Constructor injection of UserManager and SignInManager
        public UserService(UserManager<User> userManager, SignInManager<User> signInManager,IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        // Register a new user
        public async Task<IdentityResult> AddUserAsync(AddUserDto userToAddDto)
        {
            var user = new User
            {
                UserName = userToAddDto.Username,
                Email = userToAddDto.Email,
                
            };

            // Create the user in the system
            var result = await _userManager.CreateAsync(user, userToAddDto.Password);

            return result;
        }

        // Log in an existing user
        public async Task<object> LoginAsync(LoginUserDto loginDto)
        {
            // Find the user by username or email
            var user = await _userManager.FindByNameAsync(loginDto.UsernameOrEmail)
                       ?? await _userManager.FindByEmailAsync(loginDto.UsernameOrEmail);

            // If the user doesn't exist, return SignInResult.Failed with null user
            if (user == null)
            {
                return null;
            }

            // Validate the user's password
            var result = await _signInManager.PasswordSignInAsync(user, loginDto.Password, false, false);

            // Return the sign-in result and the user object
            return await GenerateTokenWithExpirationAsync(user);
        }

        private async Task<List<Claim>> BuildPayloadClaimsAsync(User user)
        {
            var claims = new List<Claim>();

            claims.Add(new Claim(ClaimTypes.Name, user.UserName));
            claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id));
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
           
            

            var roles = await _userManager.GetRolesAsync(user);

            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            return claims;
        }

        private async Task<object> GenerateTokenWithExpirationAsync(User user)
        {
            if (user == null)
            {
                return null;
            }

            // Build claims (e.g., username, roles, etc.)
            var claims = await BuildPayloadClaimsAsync(user);

            // Retrieve the secret key from configuration securely
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:SecretKey"]));

  
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create the JWT token
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(1),  // Adjust token expiry as needed
                signingCredentials: credentials
            );

            // Generate the JWT token string
            var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);

            // Return an anonymous object with the token and expiration date
            return new
            {
                Token = jwtToken,
                ExpirationDate = token.ValidTo // This is the expiration date of the token
            };
        }

    }
}
