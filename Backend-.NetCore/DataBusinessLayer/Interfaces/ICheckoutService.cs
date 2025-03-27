using SharedLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBusinessLayer.Interfaces
{
    public interface ICheckoutService
    {
        Task<bool> ProcessCheckoutAsync(string userID,ImmutableList<ProductToBuyDto> products);
    }
}
