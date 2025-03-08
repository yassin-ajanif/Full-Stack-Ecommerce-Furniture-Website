using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class Order
    {
        [Key]
        public int OrderId { get; set; }

        // Foreign Key for User
        [ForeignKey("User")]
        public string UserID { get; set; }
        public User User { get; set; }

        // Foreign Key for Order Status
        [ForeignKey("OrderStatus")]
        public int OrderStatusID { get; set; }
        public OrderStatus OrderStatus { get; set; }

        // Collection of products in the order
        public ICollection<OrderDetail> Products { get; set; }

        // Order date (usually should not require validation)
        public DateTime OrderDate { get; set; }

        // Total amount for the order (practical range)
        [Range(0.01, 10000000, ErrorMessage = "Total amount must be between 0.01 and 10,000,000.")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }

        // Stock quantity for the order (practical range)
        [Range(0, 1000000, ErrorMessage = "Stock quantity must be between 0 and 1,000,000.")]
        public int StockQuantity { get; set; }

        // Payment details for the order
        public Payment Payment { get; set; }

        // Constructor without validation logic
        public Order(/*string userID,*/ int orderStatusID, DateTime orderDate, decimal totalAmount, int stockQuantity)
        {
            /*UserID = userID;*/
            OrderStatusID = orderStatusID;
            OrderDate = orderDate;
            TotalAmount = totalAmount;
            StockQuantity = stockQuantity;
        }
    }
}
