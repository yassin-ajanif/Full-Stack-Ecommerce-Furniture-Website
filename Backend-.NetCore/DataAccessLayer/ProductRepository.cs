using DataAccessLayer.Dtos;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Migrations;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ProductRepository :IProductRepository
    {
        private readonly AppDbContext _appDbContext;

        public ProductRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public List<ProductDTO> getAllProducts()
        {
            var products = _appDbContext.Products.ToList();

            var productDtos = products.Select(p => new ProductDTO(
                p.Id,
                p.Name,
                p.Description,
                p.StockQuantity,
                p.Price,
                p.CategoryID,
                p.ImageData
            )).ToList();

            return productDtos;
        }

        public ProductDTO GetProductById(int productId)
        {
            // Find the product by its ID
            var product = _appDbContext.Products.FirstOrDefault(p => p.Id == productId);

            if (product == null)
            {
                return null;  // Return null if no product is found
            }

            // Convert the product to a ProductDTO before returning
            var productDto = new ProductDTO(
                product.Id,
                product.Name,
                product.Description,
                product.StockQuantity,
                product.Price,
                product.CategoryID,
                product.ImageData
            ) ;

            return productDto;
        }


        public bool AddProduct(ProductDTO productDto)
        {
            try
            {
                var newProduct = new Product(
                    productDto.Name,
                    productDto.Description,
                    productDto.StockQuantity,
                    productDto.Price,
                    productDto.CategoryID,
                    productDto.ImageData
                );

                _appDbContext.Products.Add(newProduct);

                // Declare the variable to store whether the product was successfully added
                bool productAddedToDatabase = _appDbContext.SaveChanges() == 1;

                return productAddedToDatabase;
            }
            catch (Exception ex)
            {
                // Log or handle the exception (e.g., console or log file)
                Console.WriteLine("An error occurred: " + ex.Message);

                return false;
            }
        }

        public bool UpdateProduct(ProductDTO productDto)
        {
            var productToUpdate = _appDbContext.Products.FirstOrDefault(p => p.Id == productDto.Id);
            if (productToUpdate == null)
            {
                return false;  // Product not found, return false
            }

            productToUpdate.Name = productDto.Name;
            productToUpdate.Description = productDto.Description;
            productToUpdate.StockQuantity = productDto.StockQuantity;
            productToUpdate.Price = productDto.Price;
            productToUpdate.CategoryID = productDto.CategoryID;
            productToUpdate.ImageData = productDto.ImageData;

            try
            {
                // Save changes and assign the result to a variable
                var productHasBeenUpdateSuccesfully = _appDbContext.SaveChanges();

                // If one row was affected, the product was updated successfully
                return productHasBeenUpdateSuccesfully == 1;
            }
            catch (Exception)
            {
                // If any error occurs, return false
                return false;
            }
        }

        public bool DeleteProduct(int productId)
        {
            // Find the product to delete
            var productToDelete = _appDbContext.Products.FirstOrDefault(p => p.Id == productId);

            if (productToDelete == null)
            {
                return false;  // Product not found, return false
            }

            try
            {
                // Remove the product from the context
                _appDbContext.Products.Remove(productToDelete);

                // Attempt to save changes to the database
                bool productDeletedSuccessfully = _appDbContext.SaveChanges() == 1;

                return productDeletedSuccessfully;
            }
            catch (Exception)
            {
                // If any error occurs during the deletion, return false
                return false;
            }
        }



    }
}
