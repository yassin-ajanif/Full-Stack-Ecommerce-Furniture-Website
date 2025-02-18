using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SharedLayer.Attributes
{
    using System.ComponentModel.DataAnnotations;
    using Microsoft.AspNetCore.Http;

    public class MaxFileSize : ValidationAttribute
    {
        private readonly int _maxSizeInBytes;

        public MaxFileSize(int maxSizeInBytes)
        {
            _maxSizeInBytes = maxSizeInBytes;
        }

        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value is IFormFile file)
            {
                if (file.Length > _maxSizeInBytes)
                {
                    return new ValidationResult($"File size must be less than {_maxSizeInBytes / (1024 * 1024)} MB.");
                }
            }
            return ValidationResult.Success;
        }
    }

}
