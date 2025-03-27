using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using SharedLayer.Dtos;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class CheckoutRepository : ICheckoutRepository
    {
        private readonly AppDbContext _appDbContext;

        public CheckoutRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> ProcessCheckoutAsync(string userID,ImmutableList<ProductToBuyDto> productsToBuy)
        {
            // Step 1: Calculate the total amount for the order
            decimal totalAmount = productsToBuy.Sum(product => product.Price * product.Quantity);

            
            // Step 2: Create an Order object using its constructor
            var order = new Order(
                userID: userID,
                orderStatusID: 1, // Assuming 1 is the status for new orders
                orderDate: DateTime.Now,
                totalAmount: totalAmount,
                stockQuantity: productsToBuy.Sum(product => product.Quantity) // Total quantity of products in the order
            );

            // Step 3: Create the OrderDetail records based on the products in the checkout, using the constructor
            var orderDetails = productsToBuy.Select(product => new OrderDetail(
                productId: product.Id,
                orderId: order.OrderId,  // We will set the OrderId after saving the order
                quantity: product.Quantity,
                price: product.Price
            )).ToList();

            // Step 4: Start the database transaction
            using (var transaction = await _appDbContext.Database.BeginTransactionAsync())
            {
                try
                {
                    // Step 5: Insert the Order
                    _appDbContext.Orders.Add(order);
                    await _appDbContext.SaveChangesAsync(); // Save to get the generated OrderId

                    // Step 6: Insert the OrderDetails
                    foreach (var detail in orderDetails)
                    {
                        detail.OrderID = order.OrderId; // Set the OrderID for each OrderDetail after OrderId is generated
                        _appDbContext.OrderDetails.Add(detail);
                    }

                    await _appDbContext.SaveChangesAsync(); // Save OrderDetails

                    // Step 7: Commit the transaction
                    await transaction.CommitAsync();

                    // Return true indicating the checkout process was successful
                    return true;
                }
                catch (Exception)
                {
                    // Step 8: Rollback the transaction in case of any error
                    await transaction.RollbackAsync();
                    return false; // Return false if the checkout failed
                }
            }
        }
    }

}
