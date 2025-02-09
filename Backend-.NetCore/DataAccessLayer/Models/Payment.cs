using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataAccessLayer.Models
{
    public class Payment
    {
        [Key]
        public int Id { get; set; }

        // Foreign key to Order
        [ForeignKey("order")]
        public int OrderID { get; set; }
        public Order Order { get; set; }

        // Validate PaymentDate to ensure it is not in the future
        [Required(ErrorMessage = "Payment date is required.")]
        [DataType(DataType.Date, ErrorMessage = "Invalid payment date format.")]
        public DateTime PaymentDate { get; set; }

        // Amount must be greater than zero and not exceed 1 million dollars
        [Range(0.01, 1000000, ErrorMessage = "Amount must be between 0.01 and 1,000,000.")]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Amount { get; set; }

        // Foreign key to PaymentMethod
        [ForeignKey("paymentMethod")]
        public int PaymentMethodID { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

        // Foreign key to PaymentStatus
        [ForeignKey("paymentStatus")]
        public int PaymentStatusID { get; set; }
        public PaymentStatus PaymentStatus { get; set; }

        // Parameterized Constructor
        public Payment(int OrderID, DateTime PaymentDate, decimal Amount, int PaymentMethodID, int PaymentStatusID)
        {
            this.OrderID = OrderID;
            this.PaymentDate = PaymentDate;
            this.Amount = Amount;
            this.PaymentMethodID = PaymentMethodID;
            this.PaymentStatusID = PaymentStatusID;
        }
    }
}
