using DataAccessLayer;
using SharedLayer.Dtos;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
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

        public List<ProductDTO> getAllProducts()
        {
           return _productRepository.getAllProducts();

        }
     
        public ProductDTO GetProductById(int productId)
        {
            
            return _productRepository.GetProductById(productId);
        }

        public bool AddProduct(ProductDTO productDto)
        {
            return _productRepository.AddProduct(productDto);
        }

        public bool UpdateProduct(ProductDTO productDto)
        {
            return _productRepository.UpdateProduct(productDto);
        }

        public bool DeleteProduct(int productId)
        {
            return _productRepository.DeleteProduct(productId);
        }
    }
}
