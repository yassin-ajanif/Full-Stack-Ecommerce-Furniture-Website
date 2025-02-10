using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataAccessLayer.Dtos;

namespace DataAccessLayer.Interfaces
{
    public interface IProductCategoryRepository
    {
        bool AddCategory(CategoryProductDTO categoryDto);
       
    }

}
