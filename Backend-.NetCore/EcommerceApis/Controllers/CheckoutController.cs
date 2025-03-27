using DataBusinessLayer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SharedLayer.Dtos;
using System.Collections.Immutable;
using System.Security.Claims;

namespace EcommerceApis.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CheckoutController : Controller
    {
        private readonly ICheckoutService _checkoutService;
        public CheckoutController(ICheckoutService checkoutService) {

            _checkoutService = checkoutService;

        }

        [HttpPost("checkoutProducts")]
        [ProducesResponseType(StatusCodes.Status200OK)] // Success
        [ProducesResponseType(StatusCodes.Status400BadRequest)] // Product list is empty or invalid
        [ProducesResponseType(StatusCodes.Status500InternalServerError)] // Server error while processing the checkout
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<ActionResult> BuyProducts([FromBody] ImmutableList<ProductToBuyDto> products)
        {
            if (products == null || products.IsEmpty)
            {
                return BadRequest("Product list cannot be empty.");
            }

            // Check if the model is valid
            if (!ModelState.IsValid)
            {
                // Return bad request with model validation errors
                return BadRequest(ModelState);
            }

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            bool orderIsSucceded = await _checkoutService.ProcessCheckoutAsync(userId,products);

            if (orderIsSucceded)
            {
                return Ok(new { Message = "Products purchased successfully!", Count = products.Count });
            }

            return StatusCode(500, new { Message = "Failed to purchase products. Please try again later.", Count = products.Count });
        }

    }
}
