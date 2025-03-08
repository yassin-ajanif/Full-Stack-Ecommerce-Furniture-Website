using SharedLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccessLayer.Interfaces
{
    public interface IProductCategoryRepository
    {
        Task<bool> AddCategoryAsync(CategoryProductDTO categoryDto);

        Task<bool> UpdateCategoryAsync( CategoryProductDTO categoryDto);

        Task<bool> DeleteCategoryAsync(int id);

        Task<CategoryProductDTO> FindCategoryAsync(int id);

        Task<IEnumerable<CategoryProductDTO>> GetAllCategoriesAsync();

        Task<int> GetCategoryIdOfCategoryName(string categoryName);
    }

}
