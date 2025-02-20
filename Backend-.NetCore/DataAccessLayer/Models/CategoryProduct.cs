using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Models
{
    public class CategoryProduct
    {
        [Key]
        public int Id { get; set; }

        // Maximum length for the Name to avoid excessively long category names
        [Required(ErrorMessage = "Category name is required.")]
        [MaxLength(50, ErrorMessage = "Category name cannot exceed 100 characters.")]
        public string Name { get; set; }

        // Maximum length for Description to avoid overly long descriptions
        [MaxLength(100, ErrorMessage = "Description cannot exceed 500 characters.")]
        public string? Description { get; set; }

        // Navigation property for related products
        public ICollection<Product> Products { get; set; }

        // Constructor
        public CategoryProduct(string name, string description=null)
        {
            Name = name;
            Description = description;
        }
    }
}
