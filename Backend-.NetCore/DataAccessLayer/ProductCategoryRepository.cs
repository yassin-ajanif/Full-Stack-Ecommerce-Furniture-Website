using DataAccessLayer.Dtos;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataAccessLayer.ProductCategoryRepository;

namespace DataAccessLayer
{
    public class ProductCategoryRepository : IProductCategoryRepository
    {

            private readonly AppDbContext _appDbContext;

            public ProductCategoryRepository(AppDbContext appDbContext)
            {
                _appDbContext = appDbContext;
            }

            // AddCategory function to add a new category to the database
            public bool AddCategory(CategoryProductDTO categoryDto)
            {
                try
                {
                    // Convert DTO to Model
                    var newCategory = new CategoryProduct(
                        categoryDto.Name,
                        categoryDto.Description
                    );

                    // Add the new category to the ProductsCategories table
                    _appDbContext.ProductsCategories.Add(newCategory);

                    // Save changes to the database
                    bool categoryAddedSuccessfully = _appDbContext.SaveChanges() == 1;

                    return categoryAddedSuccessfully;
                }
                catch (Exception ex)
                {
                    // Log or handle the exception
                    Console.WriteLine("An error occurred: " + ex.Message);
                    return false;
                }
            }
        }


    

}
