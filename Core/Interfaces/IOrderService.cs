using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities.OrderAggregate;
using Core.Entities;

namespace Core.Interfaces
{
    public interface IOrderService
    {
        Task<Order> CreateOrderAsync(string buyerEmail, int delivery, string basketId, Address shippingAddress);
        Task<Order> CreateOrderAdminAsync(string buyerEmail, int delivery, List<BasketItem> orderItems, Address shippingAddress);
         Task<Order> UpdateOrderAdminAsync(int orderId, string buyerEmail, int delivery, List<BasketItem> orderItems, Address shippingAddress);
        Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail);
        Task<IReadOnlyList<Order>> GetAllOrder();
        Task<Order> GetOrderByIdAsync(int id, string buyerEmail);
        Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync();
    }
}