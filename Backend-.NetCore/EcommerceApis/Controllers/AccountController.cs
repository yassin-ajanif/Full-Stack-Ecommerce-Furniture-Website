using DataBusinessLayer;
using DataBusinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SharedLayer.Dtos;

namespace EcommerceApis.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    
    public class AccountController : ControllerBase {

        private readonly IUserService _userService;
        public AccountController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] AddUserDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors });
            }

            // Check if the email already exists
            var emailExists = await _userService.CheckEmailExistsAsync(registerDto.Email);
            // Check if the username already exists
            var userNameExists = await _userService.CheckUserNameExistsAsync(registerDto.Username);

            List<IdentityError> allErrors = new List<IdentityError>();

            if (emailExists)
            {
                // Add the email duplication error to the error list
                allErrors.Add(new IdentityError
                {
                    Description = "Email already exists."
                });
            }

            else if (userNameExists)
            {
                // Add the username duplication error to the error list
                allErrors.Add(new IdentityError
                {
                    Description = "Username already exists."
                });
            }

            // If any email or username error exists, return them in the response
            if (allErrors.Any())
            {
                return BadRequest(allErrors.Select(e => e.Description));
            }

            // Attempt to add the user
            var result = await _userService.AddUserAsync(registerDto);

            // Otherwise, return the generated token
            return Ok(result);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors });
            }

            // Call the user service to authenticate the user and generate token object which include token and it's expary date
            var tokenObject = await _userService.LoginAsync(loginDto);

            // If result is null, the login failed (either user not found or invalid credentials)
            if (tokenObject == null)
            {
                return Unauthorized(new { Message = "Invalid username or password." });
            }

            // Return the token and expiration information
            return Ok(tokenObject);
        }

   
        // POST: api/token/validate
        [HttpPost("validate")]
        public async Task<IActionResult> ValidateToken([FromBody] TokenDto tokenDto)
        {
            if (tokenDto == null || string.IsNullOrEmpty(tokenDto.Token))
            {
                return BadRequest("Token is required.");
            }

            var isValid = await _userService.ValidateTokenAsync(tokenDto);

            if (isValid)
            {
                return Ok(new { message = "Token is valid." });
            }
            else
            {
                return Unauthorized(new { message = "Invalid or expired token." });
            }
        }
    }


}

