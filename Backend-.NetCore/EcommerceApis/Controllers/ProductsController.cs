using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBusinessLayer.Interfaces;
using SharedLayer.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EcommerceApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        // Endpoint to get all products
        [HttpGet("Allproducts")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<GetProductDto>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<CreateProductDto>>> GetAllProductsAsync()
        {
            var allProductNames = await _productService.GetAllProductsAsync();

            if (!allProductNames.Any())
            {
                return NotFound("There aren't any products existing.");
            }

            return Ok(allProductNames); // Return 200 OK with the list of products
        }

        // Endpoint to get product by ID
        [HttpGet("products/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CreateProductDto))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<GetProductDto>> GetProductByIdAsync(int id)
        {
            if (id < 1) return BadRequest("Invalid id");

            var product = await _productService.GetProductByIdAsync(id);

            if (product == null)
            {
                return NotFound("Product not found."); // Return 404 if the product is not found
            }

            return Ok(product); // Return 200 OK with the product details
        }

        // Endpoint to add a new product
        [HttpPost("Addproduct")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CreateProductDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AddProductAsync([FromForm] CreateProductDto productDto)
        {
            // Check if the model is valid (based on validation attributes in ProductDTO)
            if (!ModelState.IsValid)
            {
                // Extract validation errors from ModelState
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors }); // Return 400 with validation errors
            }

            var result = await _productService.AddProductAsync(productDto);

            if (!result)
            {
                return StatusCode(500, "An error occurred while adding the product."); // Return 500 if there's a server error
            }


            return StatusCode(201, productDto);
            // Return 201 with the newly created product
        }

        // Endpoint to update an existing product
        [HttpPut("Updateproduct")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UpdateProductDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateProductAsync([FromForm] UpdateProductDto productDto)
        {
            // Check if the model is valid (based on validation attributes in ProductDTO)
            if (!ModelState.IsValid)
            {
                // Extract validation errors from ModelState
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors }); // Return 400 with validation errors
            }

            // Check if the product exists (this can be done in the service layer or repository)
            var existingProduct = await _productService.GetProductByIdAsync(productDto.Id);
            if (existingProduct == null)
            {
                return NotFound($"Product with ID {productDto.Id} not found."); // Return 404 if the product does not exist
            }

            // Update the product
            var updatedProduct = await _productService.UpdateProductAsync(productDto);
            if (!updatedProduct)
            {
                return StatusCode(500, "An error occurred while updating the product."); // Return 500 if there's a server error
            }

            // Return 200 with the updated product
            return StatusCode(200,updatedProduct);
        }

        // Endpoint to delete a product
        [HttpDelete("products/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteProductAsync(int id)
        {
            // Check if the id is valid
            if (id < 1)
            {
                return BadRequest("Invalid product ID.");
            }

            // Check if the product exists
            var product = await _productService.GetProductByIdAsync(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            // Proceed with deleting the product
            var result = await _productService.DeleteProductAsync(id);
            if (!result)
            {
                return StatusCode(500, "An error occurred while deleting the product.");
            }

            // Return 204 No Content indicating the product was deleted successfully
            return NoContent();
        }

        // Endpoint to get product image
        [HttpGet("GetProductImage/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetProductImageAsync(int id)
        {
            // Call the data layer function to get the image byte array
            byte[] imageBytes = await _productService.GetProductImageByIdAsync(id);

            if (imageBytes == null)
            {
                return NoContent();
            }

            // Return the image as a file
            return File(imageBytes, "image/png"); // Adjust MIME type if necessary
        }


        [HttpGet("search")]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetProductsByNameAsync([FromQuery] string namePrefix)
        {
            if (string.IsNullOrWhiteSpace(namePrefix))
            {
                return Ok(Enumerable.Empty<GetProductDto>());
            }

            var products = await _productService.GetProductsByNameAsync(namePrefix);

            // If no products are found, return an empty list
            if (products == null || !products.Any())
            {
                return Ok(Enumerable.Empty<GetProductDto>()); // Return an empty list (200 OK)
            }

            return Ok(products);
        }



    }
}
