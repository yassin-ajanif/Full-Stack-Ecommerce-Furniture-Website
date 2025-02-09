using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class OrderStatus
    {
        [Key]
        public int Id { get; set; }

        // Validate that Status is not empty and has a maximum length
        [Required(ErrorMessage = "Status is required.")]
        [MaxLength(10, ErrorMessage = "Status should not exceed 10 characters.")]
        public string Status { get; set; }

        // Navigation property to related Orders
        public ICollection<Order> Orders { get; set; }

        // Parameterized Constructor
        public OrderStatus(string status)
        {
            Status = status;
        }
    }
}
