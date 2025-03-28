﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using SharedLayer.Attributes;

namespace SharedLayer.Dtos
{
    public class CreateProductDto
    {
        public int Id { get; set; }

        // Validation for Product Name
        [Required(ErrorMessage = "Product name is required.")]
        [MaxLength(50, ErrorMessage = "The name should not contain more than 50 characters.")]
        public string Name { get; set; }

        // Validation for Description
        [MaxLength(200, ErrorMessage = "Description should not be longer than 200 characters.")]
        public string? Description { get; set; }

        // Validation for StockQuantity
        [Range(0, 10000000, ErrorMessage = "Stock quantity must be a non-negative number and should not exceed 10 million.")]
        public int StockQuantity { get; set; }

        // Validation for Price
        [Range(0.01, 100000000, ErrorMessage = "Price must be greater than zero and should not exceed 100 million.")]
        public decimal Price { get; set; }

        // Validation for CategoryID
        [Range(1, int.MaxValue, ErrorMessage = "Invalid Category ID.")]
        public int CategoryID { get; set; }

        const int MaxImageSize_Is_One_1Mb = 1048576; // 1MB (1 * 1024 * 1024)

        [MaxFileSize(MaxImageSize_Is_One_1Mb)]
        public IFormFile? ImageData { get; set; }

        public CreateProductDto()
        {
        }
        
        public CreateProductDto(int id, string name, string description, int stockQuantity, decimal price, int categoryID, IFormFile? ImageData)
        {
            Id = id;
            Name = name;
            Description = description;
            StockQuantity = stockQuantity;
            Price = price;
            CategoryID = categoryID;
            this.ImageData = ImageData;
        }
    }

}
