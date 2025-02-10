using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBusinessLayer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBusinessLayer;
using DataBusinessLayer.Interfaces;
using DataAccessLayer.Dtos;
using DataAccessLayer.Interfaces;


namespace EcommerceApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryProductsController : ControllerBase
    {
        private readonly IProductCategoryService _productCategoryService;
        public CategoryProductsController(IProductCategoryService productCategoryService)
        {
            _productCategoryService = productCategoryService;
        }
        [HttpGet("ProductsCategories")]
        public ActionResult<IEnumerable<string>>getProductsCategyNames()
        {
            List<string> categories = DataBusinessLayer.CategoryProductsService.getAllProductsCategories();


            if (categories.Count == 0) return NotFound("there is no product found");

            return Ok(categories);
        }


        // Endpoint to add a new product category
        [HttpPost("product-categories")]
        [ProducesResponseType(StatusCodes.Status201Created, Type = typeof(CategoryProductDTO))]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult AddProductCategory([FromBody] CategoryProductDTO categoryDto)
        {
            // Validate the model
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(new { Errors = errors });
            }

            // Call the service layer to add the product category
            var result = _productCategoryService.AddCategory(categoryDto);

            if (!result)
            {
                return StatusCode(500, "An error occurred while adding the product category.");
            }

            return CreatedAtAction(nameof(AddProductCategory), new { id = categoryDto.Id }, categoryDto);
        }

    }
}
