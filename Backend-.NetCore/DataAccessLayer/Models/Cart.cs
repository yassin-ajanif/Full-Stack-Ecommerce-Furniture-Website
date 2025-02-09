using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class Cart
    {
        [Key]
        public int Id { get; set; }

        // Foreign key to User
        [ForeignKey("User")]
        public int UserID { get; set; }

        // Navigation property for User
        public User User { get; set; }

        // Navigation property for the Cart items (i.e., products in the cart)
        public ICollection<CartItem> ProductsCart { get; set; }

        // Quantity (upper limit set to 10 million to avoid excessive values)
        [Range(0, 10000000, ErrorMessage = "Quantity must be between 0 and 10,000,000.")]
        public int Quantity { get; set; }

        // Constructor to ensure required properties are provided
        public Cart(int userID, int quantity)
        {
            UserID = userID;  // Ensure the UserID is set when creating the cart
            Quantity = quantity;  // Assign quantity (no validation in constructor)
        }
    }
}
