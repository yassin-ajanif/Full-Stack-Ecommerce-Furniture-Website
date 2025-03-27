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

        public async Task<object> AddUserAsync(AddUserDto userToAddDto)
        {
            var user = new User
            {
                UserName = userToAddDto.Username,
                Email = userToAddDto.Email
            };

            // Create the user in the system
            var result = await _userManager.CreateAsync(user, userToAddDto.Password);

            // If the user creation fails, return the error result
            if (!result.Succeeded)
            {
                return result;
            }

            // Generate a token for the newly created user
            var token = await GenerateTokenWithExpirationAsync(user);

            return new
            {
                Token = token
            };
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

            if(!result.Succeeded) { return null; }

            // Return the sign-in result and the user object
            var token = await GenerateTokenWithExpirationAsync(user);

            return new
            {
                Token = token
            };
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
                expires: DateTime.UtcNow.AddMinutes(60),  // Adjust token expiry as needed
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

        public async Task<bool> CheckEmailExistsAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user != null; // If the user is found, return true (email exists)
        }

        public async Task<bool> CheckUserNameExistsAsync(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            return user != null;
        }

        public async Task<bool> ValidateTokenAsync(TokenDto tokenDto)
        {
            if (tokenDto == null || string.IsNullOrEmpty(tokenDto.Token))
                return false;

            // Check if token is expired
            if (tokenDto.IsExpired())
                return false; // Token is expired

            var tokenHandler = new JwtSecurityTokenHandler();
            try
            {
                // Read the secret key from configuration asynchronously
                var secretKey = await Task.Run(() => _configuration["JwtSettings:SecretKey"]);

                // Directly convert the secret key to a byte array (no Base64 decoding needed)
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));

                // Validate the JWT token using the TokenValidationParameters
                var principal = tokenHandler.ValidateToken(tokenDto.Token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = key,
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ClockSkew = TimeSpan.Zero // No tolerance for expired tokens
                }, out var validatedToken);

                // If we are here, the token is valid
                return true;
            }
            catch (Exception)
            {
                return false; // Invalid or expired token
            }
        }


    }
}
