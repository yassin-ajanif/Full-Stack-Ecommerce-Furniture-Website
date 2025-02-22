using SharedLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataBusinessLayer.Interfaces
{
    public interface IProductCategoryService
    {
        Task<IEnumerable<CategoryProductDTO>> GetAllProductsCategoriesAsync();
        Task<bool> AddCategoryAsync(CategoryProductDTO categoryDto);
        Task<bool> UpdateCategoryAsync(CategoryProductDTO categoryDto);
        Task<bool> DeleteCategoryAsync(int id);
        Task<CategoryProductDTO> FindCategoryAsync(int id);
    }
}
