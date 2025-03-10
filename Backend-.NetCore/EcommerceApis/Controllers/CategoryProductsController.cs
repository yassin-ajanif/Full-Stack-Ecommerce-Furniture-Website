using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBusinessLayer.Interfaces;
using SharedLayer.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer;
using DataAccessLayer.Models;
using Microsoft.AspNetCore.Authorization;

namespace EcommerceApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoryProductsController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;

        public CategoryProductsController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }

       
        [HttpGet("All")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<CategoryProductDTO>))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<CategoryProductDTO>>> GetProductCategoriesAsync()
        {
           
            IEnumerable<CategoryProductDTO> categories = await _productCategoryService.GetAllProductsCategoriesAsync();

            if (categories == null || !categories.Any())
            {
                return NotFound("There are no categories found.");
            }

            //return StatusCode(200,categories);
            return Ok(categories);
        }

        // Endpoint to add a new product category
        [HttpPost("add")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CategoryProductDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> AddProductCategoryAsync([FromBody] CategoryProductDTO categoryDto)
        {
           
            // Validate the model
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors });
            }

            // Call the service layer to add the product category
            var result = await _productCategoryService.AddCategoryAsync(categoryDto);

            if (!result)
            {
                return StatusCode(500, "An error occurred while adding the product category.");
            }

            return StatusCode(201, categoryDto);
        }

        // Endpoint to update a category
        [HttpPut("update")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CategoryProductDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)] // Add proper response
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> UpdateProductCategoryAsync([FromBody] CategoryProductDTO categoryDto)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors });
            }

            var result = await _productCategoryService.UpdateCategoryAsync(categoryDto);

            if (result == null)
            {
                return NotFound("Product category not found."); // ✅ Return 404 if category doesn't exist
            }

            if (!result)
            {
                return StatusCode(500, "An error occurred while updating the product category.");
            }

            return Ok(categoryDto); // ✅ Return 200 with updated category
        }

        // Endpoint to delete a category
        [HttpDelete("delete/{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> DeleteProductCategoryAsync(int id)
        {
            var result = await _productCategoryService.DeleteCategoryAsync(id);

            if (!result)
            {
                return StatusCode(500, "An error occurred while deleting the product category.");
            }

            return NoContent();
        }

        // Endpoint to find a specific category by ID
        [HttpGet("get/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CategoryProductDTO))]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CategoryProductDTO>> GetProductCategoryByIdAsync(int id)
        {
            var category = await _productCategoryService.FindCategoryAsync(id);

            if (category == null)
            {
                return NotFound("Category not found.");
            }

            return StatusCode(200,category);
        }



}
}
