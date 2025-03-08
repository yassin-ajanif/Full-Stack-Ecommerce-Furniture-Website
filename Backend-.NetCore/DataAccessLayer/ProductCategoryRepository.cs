using SharedLayer.Dtos;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class ProductCategoryRepository : IProductCategoryRepository
    {
        private readonly AppDbContext _appDbContext;

        public ProductCategoryRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        // AddCategory function to add a new category to the database asynchronously
        public async Task<bool> AddCategoryAsync(CategoryProductDTO categoryDto)
        {
            try
            {
                // Convert DTO to Model
                var newCategory = new CategoryProduct(
                    categoryDto.Name,
                    categoryDto.Description
                );

                // Add the new category to the ProductsCategories table
                await _appDbContext.ProductsCategories.AddAsync(newCategory);

                // Save changes to the database
                int rowsAffected = await _appDbContext.SaveChangesAsync();

                return rowsAffected == 1; // Return true if one row was affected (category added successfully)
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine("An error occurred: " + ex.Message);
                return false;
            }
        }

        // UpdateCategory function to update an existing category
        public async Task<bool> UpdateCategoryAsync(CategoryProductDTO categoryDto)
        {
            try
            {
                // Find the category by ID from the DTO
                var existingCategory = await _appDbContext.ProductsCategories
                    .FirstOrDefaultAsync(c => c.Id == categoryDto.Id);

                if (existingCategory == null)
                {
                    // If the category does not exist, return false
                    return false;
                }

                // Update the category's properties
                existingCategory.Name = categoryDto.Name;
                existingCategory.Description = categoryDto.Description;

                // Save changes to the database
                int rowsAffected = await _appDbContext.SaveChangesAsync();

                return rowsAffected == 1; // Return true if one row was affected (category updated successfully)
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine("An error occurred: " + ex.Message);
                return false;
            }
        }


        // DeleteCategory function to delete an existing category
        public async Task<bool> DeleteCategoryAsync(int id)
        {
            try
            {
                // Find the category by ID
                var category = await _appDbContext.ProductsCategories
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (category == null)
                {
                    // If the category does not exist, return false
                    return false;
                }

                // Remove the category from the database
                _appDbContext.ProductsCategories.Remove(category);

                // Save changes to the database
                int rowsAffected = await _appDbContext.SaveChangesAsync();

                return rowsAffected == 1; // Return true if one row was affected (category deleted successfully)
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine("An error occurred: " + ex.Message);
                return false;
            }
        }

        // FindCategory function to find a category by ID asynchronously
        public async Task<CategoryProductDTO> FindCategoryAsync(int id)
        {
            try
            {
                // Find the category by ID
                var category = await _appDbContext.ProductsCategories
                    .FirstOrDefaultAsync(c => c.Id == id);

                if (category == null)
                {
                    // If the category does not exist, return null or an empty DTO
                    return null;
                }

                // Return the category as a DTO
                return new CategoryProductDTO(category.Name,category.Id,category.Description);
                
            }
            catch (Exception ex)
            {
                // Log or handle the exception
                Console.WriteLine("An error occurred: " + ex.Message);
                return null;
            }
        }


        public async Task<IEnumerable<CategoryProductDTO>> GetAllCategoriesAsync()
        {


            var productCategories = await _appDbContext.ProductsCategories
                .Select(category => new CategoryProductDTO(category.Name, category.Id, category.Description))
                .ToListAsync();

            return productCategories;  // Returns an IEnumerable with the result, even if there's just one category
        }


        public async Task<int> GetCategoryIdOfCategoryName(string categoryName)
        {
            try
            {
                var category = await _appDbContext.ProductsCategories
                    .FirstOrDefaultAsync(cName => cName.Name == categoryName);

                return category?.Id ?? -1;
            }
            catch (Exception ex)
            {
               
                return -1; // Return -1 in case of an error
            }
        }


    }
}
