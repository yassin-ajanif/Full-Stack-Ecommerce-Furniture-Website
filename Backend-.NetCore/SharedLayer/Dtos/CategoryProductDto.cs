using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLayer.Dtos
{
        public class CategoryProductDTO
        {
            public int Id { get; set; }

            // Maximum length for the Name to avoid excessively long category names
            [Required(ErrorMessage = "Category name is required.")]
            [MaxLength(50, ErrorMessage = "Category name cannot exceed 50 characters.")]
            public string Name { get; set; }

            // Maximum length for Description to avoid overly long descriptions
            [MaxLength(100, ErrorMessage = "Description cannot exceed 100 characters.")]
            public string? Description { get; set; }

            // Constructor
            public CategoryProductDTO(string name, int id = 0, string description = null)
            {
                Id = id;
                Name = name;
                Description = description;
            }
        }
    }

