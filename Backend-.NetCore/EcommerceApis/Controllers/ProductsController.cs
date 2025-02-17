using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBusinessLayer;
using DataBusinessLayer.Interfaces;
using SharedLayer.Dtos;

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
        [HttpGet("products")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<ProductDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<IEnumerable<ProductDTO>> getAllProduct()
        {
            var allProductNames = _productService.getAllProducts();

            if (!allProductNames.Any())
            {
                return NotFound("There aren't any products existing.");
            }

            return Ok(allProductNames); // Return 200 OK with the list of products
        }

        // Endpoint to get product by ID
        [HttpGet("products/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<ProductDTO> GetProductById(int id)
        {
            if (id < 1) return BadRequest("Invalid id");

            var product = _productService.GetProductById(id);

            if (product == null)
            {
                return NotFound("Product not found."); // Return 404 if the product is not found
            }

            return Ok(product); // Return 200 OK with the product details
        }

        // Endpoint to add a new product
        [HttpPost("products")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(ProductDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult AddProduct([FromForm] ProductDTO productDto)
        {
            // Check if the model is valid (based on validation attributes in ProductDTO)
            if (!ModelState.IsValid)
            {
                // Extract validation errors from ModelState
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors }); // Return 400 with validation errors
            }

            var result = _productService.AddProduct(productDto);

            if (!result)
            {
                return StatusCode(500, "An error occurred while adding the product."); // Return 500 if there's a server error
            }

            return CreatedAtAction(nameof(GetProductById), new { id = productDto.Id }, productDto); // Return 201 with the newly created product
        }

        // Endpoint to update an existing product
        [HttpPut("products")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(ProductDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult UpdateProduct([FromBody] ProductDTO productDto)
        {
            // Check if the model is valid (based on validation attributes in ProductDTO)
            if (!ModelState.IsValid)
            {
                // Extract validation errors from ModelState
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors }); // Return 400 with validation errors
            }

            // Check if the product exists (this can be done in the service layer or repository)
            var existingProduct = _productService.GetProductById(productDto.Id);
            if (existingProduct == null)
            {
                return NotFound($"Product with ID {productDto.Id} not found."); // Return 404 if the product does not exist
            }

            // Update the product
            var updatedProduct = _productService.UpdateProduct(productDto);
            if (updatedProduct == null)
            {
                return StatusCode(500, "An error occurred while updating the product."); // Return 500 if there's a server error
            }

            // Return 200 with the updated product
            return Ok(updatedProduct);
        }


        [HttpDelete("products/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult DeleteProduct(int id)
        {
            // Check if the id is valid
            if (id < 1)
            {
                return BadRequest("Invalid product ID.");
            }

            // Check if the product exists
            var product = _productService.GetProductById(id);
            if (product == null)
            {
                return NotFound("Product not found.");
            }

            // Proceed with deleting the product
            var result = _productService.DeleteProduct(id);
            if (!result)
            {
                return StatusCode(500, "An error occurred while deleting the product.");
            }

            // Return 204 No Content indicating the product was deleted successfully
            return NoContent();
        }


    }

}
