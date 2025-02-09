using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class PaymentStatus
    {
        [Key]
        public int Id { get; set; }

        // Renamed to reflect the status name
        [Required(ErrorMessage = "Payment status name is required.")]
        [MaxLength(50, ErrorMessage = "Payment status name cannot exceed 50 characters.")]
        public string StatusName { get; set; }

        // Navigation property for related Payments
        public ICollection<Payment> Payments { get; set; } = new List<Payment>();

        // Parameterized Constructor
        public PaymentStatus(string StatusName)
        {
            this.StatusName = StatusName;
        }
    }
}
