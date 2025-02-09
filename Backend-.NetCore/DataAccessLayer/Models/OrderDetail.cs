using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }

        // Foreign Key to Product
        [ForeignKey("Product")]
        public int ProductID { get; set; }
        public Product Product { get; set; }

        // Foreign Key to Order
        [ForeignKey("Order")]
        public int OrderID { get; set; }
        public Order Order { get; set; }

        // Quantity (must be a positive number)
        [Range(1, 10000, ErrorMessage = "Quantity must be between 1 and 10,000.")]
        public int Quantity { get; set; }

        // Price (must be positive, with reasonable upper limit)
        [Range(0.01, 1000000, ErrorMessage = "Price must be between 0.01 and 1,000,000.")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        // Default Constructor
        public OrderDetail() { }

        // Parameterized Constructor
        public OrderDetail(int productId, int orderId, int quantity, decimal price)
        {
            ProductID = productId;
            OrderID = orderId;
            Quantity = quantity;
            Price = price;
        }
    }
}
