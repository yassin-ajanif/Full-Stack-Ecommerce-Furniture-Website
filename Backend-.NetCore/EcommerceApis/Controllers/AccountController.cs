using DataBusinessLayer;
using DataBusinessLayer.Interfaces;
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

        // POST: api/account/signup
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] AddUserDto registerDto)
        {

            if (!ModelState.IsValid)
            {
                // Extract validation errors from ModelState
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors }); // Return 400 with validation errors
            }

            // Call the user service to create the user
            var result = await _userService.AddUserAsync(registerDto);

            if (result.Succeeded)
            {
                // If user creation succeeded, return a success response (you could return a user or token, etc.)
                return Ok(new { Message = "User registered successfully." });
            }

            // If the result failed, return a bad request with errors
            return BadRequest(result.Errors.Select(e => e.Description));
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



    }
}
