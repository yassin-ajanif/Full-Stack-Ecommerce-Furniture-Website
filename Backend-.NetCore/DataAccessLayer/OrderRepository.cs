using DataAccessLayer.Interfaces;
using DataAccessLayer.Models;
using Microsoft.EntityFrameworkCore;
using SharedLayer.Dtos;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DataAccessLayer
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _appDbContext;

        public OrderRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            var orders = await _appDbContext.Orders
                .Include(o => o.OrderStatus) // Load only the OrderStatus navigation property
                .ToListAsync();

            var orderDtos = orders.Select(o => new OrderDto
            {
                Id = o.OrderId.ToString(),
                Date = o.OrderDate.ToString("yyyy-MM-dd"),
                Status = o.OrderStatus.Status , // Handle null OrderStatus gracefully
                Total = o.TotalAmount.ToString("F2")
            }).ToList();

            return orderDtos;
        }

        public async Task<IEnumerable<OrderedProductDto>> GetProductsByOrderIdAsync(string orderId)
        {
            var products = await _appDbContext.OrderDetails
                .Include(p => p.Product) // Include the Product navigation property
                .Where(p => p.OrderID.ToString() == orderId)
                .ToListAsync();

            var productDtos = products.Select(p => new OrderedProductDto
            {
                Id = p.ProductID.ToString(),
                Name = p.Product.Name , // Handle null Product gracefully
                Price = p.Price.ToString("F2"),
                OrderId = p.OrderID.ToString()
            }).ToList();

            return productDtos;
        }
    }
}