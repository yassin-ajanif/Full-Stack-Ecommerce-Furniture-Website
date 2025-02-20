
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore; // Add this for async methods
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SharedLayer.Dtos;
using Microsoft.AspNetCore.Http;

namespace DataAccessLayer
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppDbContext _appDbContext;

        public ProductRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // Convert to async
        public async Task<IEnumerable<GetProductDto>> GetAllProductsAsync()
        {
            var products = await _appDbContext.Products.ToListAsync(); // Use ToListAsync()

            var productDtos = products.Select(p => new GetProductDto(
                p.Id,
                p.Name,
                p.Description,
                p.StockQuantity,
                p.Price,
                p.CategoryID
            )).ToList();

            return productDtos;
        }

        // Convert to async
        public async Task<GetProductDto> GetProductByIdAsync(int productId)
        {
            // Use FirstOrDefaultAsync()
            var product = await _appDbContext.Products.FirstOrDefaultAsync(p => p.Id == productId);

            if (product == null)
            {
                return null;  // Return null if no product is found
            }

            // Convert the product to a ProductDTO before returning
            var productDto = new GetProductDto(
                product.Id,
                product.Name,
                product.Description,
                product.StockQuantity,
                product.Price,
                product.CategoryID
            );

            return productDto;
        }

        // Convert to async
        public async Task<bool> AddProductAsync(CreateProductDto productDto)
        {
            try
            {
                var newProduct = new Product(
                    productDto.Name,
                    productDto.Description,
                    productDto.StockQuantity,
                    productDto.Price,
                    productDto.CategoryID,
                    FileHelper.ConvertIFormFileToByteArray(productDto.ImageData)
                );

                _appDbContext.Products.Add(newProduct);

                // Use SaveChangesAsync()
                bool productAddedToDatabase = await _appDbContext.SaveChangesAsync() == 1;

                return productAddedToDatabase;
            }
            catch (Exception ex)
            {
                // Log or handle the exception (e.g., console or log file)
                Console.WriteLine("An error occurred: " + ex.Message);

                return false;
            }
        }

        // Convert to async
        public async Task<bool> UpdateProductAsync(UpdateProductDto productDto)
        {
            var productToUpdate = await _appDbContext.Products.FirstOrDefaultAsync(p => p.Id == productDto.Id); // Use FirstOrDefaultAsync()
            if (productToUpdate == null)
            {
                return false;  // Product not found, return false
            }

            productToUpdate.Name = productDto.Name;
            productToUpdate.Description = productDto.Description;
            productToUpdate.StockQuantity = productDto.StockQuantity;
            productToUpdate.Price = productDto.Price;
            productToUpdate.CategoryID = productDto.CategoryID;
            productToUpdate.ImageData = FileHelper.ConvertIFormFileToByteArray(productDto.ImageData);

            try
            {
                // Use SaveChangesAsync()
                var productHasBeenUpdateSuccesfully = await _appDbContext.SaveChangesAsync();

                // If one row was affected, the product was updated successfully
                return productHasBeenUpdateSuccesfully == 1;
            }
            catch (Exception)
            {
                // If any error occurs, return false
                return false;
            }
        }

        // Convert to async
        public async Task<bool> DeleteProductAsync(int productId)
        {
            // Use FirstOrDefaultAsync()
            var productToDelete = await _appDbContext.Products.FirstOrDefaultAsync(p => p.Id == productId);

            if (productToDelete == null)
            {
                return false;  // Product not found, return false
            }

            try
            {
                // Remove the product from the context
                _appDbContext.Products.Remove(productToDelete);

                // Use SaveChangesAsync()
                bool productDeletedSuccessfully = await _appDbContext.SaveChangesAsync() == 1;

                return productDeletedSuccessfully;
            }
            catch (Exception)
            {
                // If any error occurs during the deletion, return false
                return false;
            }
        }

        // Convert to async
        public async Task<byte[]> GetProductImageByIdAsync(int productId)
        {
            // Use FirstOrDefaultAsync()
            var product = await _appDbContext.Products
                .Where(p => p.Id == productId)
                .FirstOrDefaultAsync();

            // If the product is not found, return null or throw an exception
            if (product == null)
            {
                return null; // Or you could throw an exception based on your needs
            }

            // Return the image data (assuming it's stored as a byte array in the ImageData column)
            return product.ImageData;
        }


        public async Task<IEnumerable<GetProductDto>> GetProductsByNameAsync(string namePrefix)
        {
            if (string.IsNullOrWhiteSpace(namePrefix))
            {
                return Enumerable.Empty<GetProductDto>();
            }

            var products = await _appDbContext.Products
                .Where(p => p.Name.StartsWith(namePrefix)) // ✅ Efficient search
                .AsNoTracking() // ✅ Improve performance (read-only operation)
                .ToListAsync();

            return products.Select(p => new GetProductDto(
                p.Id,
                p.Name,
                p.Description,
                p.StockQuantity,
                p.Price,
                p.CategoryID
            ));
        }


    }
}