using DataAccessLayer;
using SharedLayer.Dtos;
using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataBusinessLayer.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataBusinessLayer
{
    public class CategoryProductsService : IProductCategoryService
    {
        private readonly IProductCategoryRepository _productCategoryRepository;

        public CategoryProductsService(IProductCategoryRepository productCategoryRepository)
        {
            _productCategoryRepository = productCategoryRepository;
        }

        public async Task<IEnumerable<CategoryProductDTO>> GetAllProductsCategoriesAsync()
        {
           
            
        return await _productCategoryRepository.GetAllCategoriesAsync();

            
        }

        public async Task<bool> AddCategoryAsync(CategoryProductDTO categoryDto)
        {
            return await _productCategoryRepository.AddCategoryAsync(categoryDto);
        }

        public async Task<bool> UpdateCategoryAsync( CategoryProductDTO categoryDto)
        {
            return await _productCategoryRepository.UpdateCategoryAsync(categoryDto);
        }

        public async Task<bool> DeleteCategoryAsync(int id)
        {
            return await _productCategoryRepository.DeleteCategoryAsync(id);
        }

        public async Task<CategoryProductDTO> FindCategoryAsync(int id)
        {
            return await _productCategoryRepository.FindCategoryAsync(id);
        }
    }
}
