using DataAccessLayer;
using DataAccessLayer.Interfaces;
using DataBusinessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBusinessLayer
{
    public class ProductsService :IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductsService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public List<string> getAllProducts()
        {       
            return _productRepository.getAllProducts();
             
        }
    }
}
