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
        bool AddCategory(CategoryProductDTO categoryDto);
       
    }

}
