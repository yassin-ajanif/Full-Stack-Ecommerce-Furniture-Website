using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataAccessLayer;
using SharedLayer.Dtos;
using DataBusinessLayer.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBusinessLayer
{
    public class ProductsService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductsService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        // Async method to get all products
        public async Task<IEnumerable<GetProductDto>> GetAllProductsAsync()
        {
            return await _productRepository.GetAllProductsAsync();
        }

        // Async method to get product by Id
        public async Task<GetProductDto> GetProductByIdAsync(int productId)
        {
            return await _productRepository.GetProductByIdAsync(productId);
        }

        // Async method to add a new product
        public async Task<bool> AddProductAsync(CreateProductDto productDto)
        {
            return await _productRepository.AddProductAsync(productDto);
        }

        // Async method to update an existing product
        public async Task<bool> UpdateProductAsync(UpdateProductDto productDto)
        {
            return await _productRepository.UpdateProductAsync(productDto);
        }

        // Async method to delete a product by Id
        public async Task<bool> DeleteProductAsync(int productId)
        {
            return await _productRepository.DeleteProductAsync(productId);
        }

        // Async method to get the image of a product by Id
        public async Task<byte[]> GetProductImageByIdAsync(int productID)
        {
            return await _productRepository.GetProductImageByIdAsync(productID);
        }

        public async Task<IEnumerable<GetProductDto>> GetProductsByNameAsync(string namePrefix)
        {
            return await _productRepository.GetProductsByNameAsync(namePrefix);
        }
    }
}