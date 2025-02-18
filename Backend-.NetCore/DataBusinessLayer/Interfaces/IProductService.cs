using SharedLayer.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBusinessLayer.Interfaces
{
    public interface IProductService
    {
        // Async method to get all products
        Task<IEnumerable<GetProductDto>> GetAllProductsAsync();

        // Async method to get a product by its Id
        Task<GetProductDto> GetProductByIdAsync(int productId);

        // Async method to add a new product
        Task<bool> AddProductAsync(CreateProductDto productDto);

        // Async method to update an existing product
        Task<bool> UpdateProductAsync(CreateProductDto productDto);

        // Async method to delete a product by Id
        Task<bool> DeleteProductAsync(int productId);

        // Async method to get the image of a product by Id
        Task<byte[]> GetProductImageByIdAsync(int productID);
    }
}
