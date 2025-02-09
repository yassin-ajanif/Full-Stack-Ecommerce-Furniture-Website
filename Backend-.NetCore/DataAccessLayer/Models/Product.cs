using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class Product
    {
        [Key]
        public int Id { get; set; }

        // Maximum length validation for Name (must not exceed 10 characters)
        [Required(ErrorMessage = "Product name is required.")]
        [MaxLength(50, ErrorMessage = "The name should not contain more than 10 characters.")]
        public string Name { get; set; }

        // Description can be null, no validation necessary, but we can add length validation if needed.
        [MaxLength(200, ErrorMessage = "Description should not be longer than 200 characters.")]
        public string? Description { get; set; }

        // Stock quantity with a practical upper limit (10 million is reasonable)
        [Range(0, 10000000, ErrorMessage = "Stock quantity must be a non-negative number and should not exceed 10 million.")]
        public int StockQuantity { get; set; }

        [Range(0.01, 100000000, ErrorMessage = "Price must be greater than zero and should not exceed 100 million.")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }


        // Foreign key to CategoryProduct
        [ForeignKey("CategoryProduct")]
        [Range(1, int.MaxValue, ErrorMessage = "Invalid Category ID.")]
        public int CategoryID { get; set; }

        // Navigation property for related CategoryProduct
        public CategoryProduct CategoryProduct { get; set; }

        // Constructor
        public Product(string Name, string? description, int stockQuantity, decimal price, int categoryID)
        {
            this.Name = Name;
            Description = description;
            StockQuantity = stockQuantity;
            Price = price;
            CategoryID = categoryID;
        }

        // Navigation properties for related entities
        public ICollection<OrderDetail> Orders { get; set; }
        public ICollection<CartItem> Carts { get; set; }
    }
}
