using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLayer.Dtos
{
        public class GetProductDto
        {
            public int Id { get; set; }

            // Product Name (No validation as this is for retrieval only)
            public string Name { get; set; }

            // Description (Optional, and no validation required)
            public string? Description { get; set; }

            // Stock Quantity (Read-only for retrieval)
            public int StockQuantity { get; set; }

            // Price (Read-only for retrieval)
            public decimal Price { get; set; }

            // Category ID (Read-only for retrieval)
            public int CategoryID { get; set; }

            // Constructor for GetProductDto
            public GetProductDto()
            {
            }

            // Constructor to initialize GetProductDto from product entity
            public GetProductDto(int id, string name, string description, int stockQuantity, decimal price, int categoryID)
            {
                Id = id;
                Name = name;
                Description = description;
                StockQuantity = stockQuantity;
                Price = price;
                CategoryID = categoryID;
            }
        }
    }

