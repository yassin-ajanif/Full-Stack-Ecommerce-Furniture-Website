using System;
using System.ComponentModel.DataAnnotations;

namespace DataAccessLayer.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }

        // Name should not be empty and must have a reasonable length
        [Required(ErrorMessage = "User name is required.")]
        [MaxLength(100, ErrorMessage = "User name cannot exceed 100 characters.")]
        public string Name { get; set; }

        // Email must be in a valid format
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email format.")]
        [MaxLength(150, ErrorMessage = "Email cannot exceed 150 characters.")]
        public string Email { get; set; }

        // Password should be hashed
        [Required(ErrorMessage = "Password is required.")]
        [MaxLength(20, ErrorMessage = "Password cannot exceed 20 characters.")]
        public string PasswordHashed { get; set; }

        // Address validation
        [MaxLength(300, ErrorMessage = "Address cannot exceed 300 characters.")]
        public string Address { get; set; }

        // Phone number validation
        [MaxLength(15, ErrorMessage = "Phone number cannot exceed 15 characters.")]
        [Phone(ErrorMessage = "Invalid phone number format.")]
        public string Phone { get; set; }

        // Navigation property to Cart
        public Cart Cart { get; set; }

        // Parameterized Constructor
        public User(string name, string email, string passwordHashed, string address = null, string phone = null)
        {
            Name = name;
            Email = email;
            PasswordHashed = passwordHashed;
            Address = address;
            Phone = phone;
        }
    }
}
