using DataAccessLayer;
using DataAccessLayer.Dtos;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataBusinessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataBusinessLayer
{
    public class CategoryProductsService :IProductCategoryService
    {
        private readonly IProductCategoryRepository _productCategoryRepository;
        public CategoryProductsService(IProductCategoryRepository productCategoryRepository)
        {
            _productCategoryRepository = productCategoryRepository;
        }
        public static List<string> getAllProductsCategories()
        {
            var myDatabase = new AppDbContext();

            var productsCategoryNames = myDatabase.ProductsCategories.Select(Category => Category.Name ).ToList();

            return productsCategoryNames;
        }

        public bool AddCategory(CategoryProductDTO categoryDto)
        {

            return _productCategoryRepository.AddCategory(categoryDto);

        }

    }
}
