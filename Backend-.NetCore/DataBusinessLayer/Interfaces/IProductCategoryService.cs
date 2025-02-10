using DataAccessLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBusinessLayer.Interfaces
{
    public interface IProductCategoryService
    {
        bool AddCategory(CategoryProductDTO categoryDto);
    }
}
