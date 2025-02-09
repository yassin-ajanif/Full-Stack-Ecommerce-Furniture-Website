using DataAccessLayer;
using Microsoft.EntityFrameworkCore;

namespace DataBusinessLayer
{
    public class CategoryProductsService
    {


        public static List<string> getAllProductsCategories()
        {
            var myDatabase = new AppDbContext();

            var productsCategoryNames = myDatabase.ProductsCategories.Select(Category => Category.Name ).ToList();

            return productsCategoryNames;
        }

    }
}
