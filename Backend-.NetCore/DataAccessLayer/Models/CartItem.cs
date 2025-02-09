using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class CartItem
    {
        [Key]
        public int Id { get; set; }

        // Foreign key to Cart
        [ForeignKey("Cart")]
        public int CartId { get; set; }

        // Navigation property for Cart
        public Cart Cart { get; set; }

        // Foreign key to Product
        [ForeignKey("Product")]
        public int ProductID { get; set; }

        // Navigation property for Product
        public Product Product { get; set; }

        // Quantity of the product in the cart with validation range
        [Range(0, 10000, ErrorMessage = "Quantity must be between 0 and 10,000.")]
        public int Quantity { get; set; }

        // Price of the product in the cart with validation range
        [Range(0, 1000000, ErrorMessage = "Price must be between 0 and 1,000,000.")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        // Constructor to ensure required properties are provided
        public CartItem(int CartId, int ProductID, int Quantity, decimal Price)
        {
            this.CartId = CartId;  // Assign the CartId
            this.ProductID = ProductID;  // Assign the ProductID
            this.Quantity = Quantity;  // Assign the quantity
            this.Price = Price;  // Assign the price
        }
    }
}
