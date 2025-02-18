using SharedLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    
        public interface IProductRepository
        {
            // Get all products asynchronously
            Task<IEnumerable<GetProductDto>> GetAllProductsAsync();

            // Get a product by its ID asynchronously
            Task<GetProductDto> GetProductByIdAsync(int productId);

            // Add a new product asynchronously
            Task<bool> AddProductAsync(CreateProductDto productDto);

            // Update an existing product asynchronously
            Task<bool> UpdateProductAsync(CreateProductDto productDto);

            // Delete a product by its ID asynchronously
            Task<bool> DeleteProductAsync(int productId);

            // Get the image of a product by its ID asynchronously (returns a byte array)
            Task<byte[]> GetProductImageByIdAsync(int productId);
        }
    }

