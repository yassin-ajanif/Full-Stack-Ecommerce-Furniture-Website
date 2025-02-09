using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DataBusinessLayer;
using DataBusinessLayer.Interfaces;

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

        [HttpGet("products")]
        public ActionResult<IEnumerable<string>> getAllProduct()
        {
             var allProductNames = _productService.getAllProducts();

             if(!allProductNames.Any()) { return NotFound("there isn't any products existing"); }

             return Ok(allProductNames);
             
        }
    }
}
