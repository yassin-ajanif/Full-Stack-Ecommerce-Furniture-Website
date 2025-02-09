using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBusinessLayer;

namespace EcommerceApis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryProductsController : ControllerBase
    {


        [HttpGet("ProductsCategories")]
        public ActionResult<IEnumerable<string>>getProductsCategyNames()
        {
            List<string> categories = DataBusinessLayer.CategoryProductsService.getAllProductsCategories();


            if (categories.Count == 0) return NotFound("there is no product found");

            return Ok(categories);
        }

    }
}
