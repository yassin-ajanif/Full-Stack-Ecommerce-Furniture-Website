using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using DataBusinessLayer.Interfaces;
using SharedLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DataBusinessLayer
{
    public class CheckoutService : ICheckoutService
    {
        private readonly ICheckoutRepository _checkoutRepository;
        public CheckoutService(ICheckoutRepository checkoutRepository) {

            _checkoutRepository = checkoutRepository;
        }

         public async Task<bool> ProcessCheckoutAsync(string userID,ImmutableList<ProductToBuyDto> productsToBuy)
        {
            if(userID == null) return false;

            return  await _checkoutRepository.ProcessCheckoutAsync(userID,productsToBuy);
        }
    }
}
