using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class PaymentMethod
    {
        [Key]
        public int Id { get; set; }

        // Ensuring the PaymentMethodName is not empty and doesn't exceed a reasonable length
        [Required(ErrorMessage = "Payment method name is required.")]
        [MaxLength(10, ErrorMessage = "Payment method name cannot exceed 10 characters.")]
        public string PaymentMethodName { get; set; }

        // Navigation property for related Payments
        public ICollection<Payment> Payments { get; set; }

        // Parameterized Constructor
        public PaymentMethod(string PaymentMethodName)
        {
            this.PaymentMethodName = PaymentMethodName;
        }
    }
}
