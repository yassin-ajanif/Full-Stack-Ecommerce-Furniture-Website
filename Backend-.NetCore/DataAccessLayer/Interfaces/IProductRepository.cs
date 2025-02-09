using DataAccessLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface IProductRepository
    {
      
            List<ProductDTO> getAllProducts();    // Get all products
            ProductDTO GetProductById(int productId);    // Get a single product by ID
            bool AddProduct(ProductDTO productDto);    // Add a new product
            bool UpdateProduct(ProductDTO productDto);    // Update an existing product
            bool DeleteProduct(int productId);    // Delete a product by ID
      
    }
}
