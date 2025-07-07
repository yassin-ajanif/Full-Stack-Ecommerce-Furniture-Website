using DataAccessLayer.Interfaces;
using SharedLayer.Dtos;
using DataBusinessLayer.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DataBusinessLayer
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;

        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<IEnumerable<OrderDto>> GetAllOrdersAsync()
        {
            return await _orderRepository.GetAllOrdersAsync();
        }

        public async Task<IEnumerable<OrderedProductDto>> GetProductsByOrderIdAsync(string orderId)
        {
            return await _orderRepository.GetProductsByOrderIdAsync(orderId);
        }
    }
}