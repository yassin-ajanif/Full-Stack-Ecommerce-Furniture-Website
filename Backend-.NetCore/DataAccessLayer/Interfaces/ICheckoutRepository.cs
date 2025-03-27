using SharedLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interfaces
{
    public interface ICheckoutRepository
    {
        Task<bool> ProcessCheckoutAsync(string userID, ImmutableList<ProductToBuyDto> productss);
    }
}
