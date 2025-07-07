using SharedLayer.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBusinessLayer.Interfaces
{
    public interface IOrderService
    {
        // Get all orders asynchronously
        Task<IEnumerable<OrderDto>> GetAllOrdersAsync();

        // Get all products by order ID asynchronously
        Task<IEnumerable<OrderedProductDto>> GetProductsByOrderIdAsync(string orderId);
    }
}