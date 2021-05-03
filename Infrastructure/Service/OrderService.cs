using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Entities.OrderAggregate;
using Core.Interfaces;
using Core.Specifications;

namespace Infrastructure.Service
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaymentService _paymentService;

        private readonly IBasketRepository _basketRepo;
        public OrderService(IBasketRepository basketRepo, IUnitOfWork unitOfWork, IPaymentService paymentService)
        {
            _paymentService = paymentService;
            _unitOfWork = unitOfWork;
            _basketRepo = basketRepo;

        }

        public async Task<Order> CreateOrderAsync(string buyerEmail, int deliveryMethodId, string basketId, Address shippingAddress)
        {
            //get bastket from the repo
            var basket = await _basketRepo.GetBasketAsync(basketId);
            //get items from the product repo
            var items = new List<OrderItem>();
            foreach (var item in basket.Items)
            {
                var specProduct = new ProductWithTypesAndBrandsSpecification(item.Id);
                var productItem = await _unitOfWork.Repository<Product>().GetEntityWithSpec(specProduct);
                var itemOrdered = new ProductItemOrdered(productItem.Id, item.Size, productItem.Name,
                 productItem.Photos.FirstOrDefault(x => x.IsMain)?.PictureUrl);
                var productSize = productItem.ProductSizes.FirstOrDefault(x => x.Size == item.Size);
                var orderItem = new OrderItem();
                if (item.Quantity > productSize.Quantity)
                {
                    orderItem = new OrderItem(itemOrdered, productItem.Price, productSize.Quantity);
                    productSize.Quantity = 0;
                }
                else
                {
                    orderItem = new OrderItem(itemOrdered, productItem.Price, item.Quantity);
                    productSize.Quantity = productSize.Quantity - item.Quantity;

                }
                productItem.AddOrUpdateProductSize(productSize.Size, productSize.Quantity);
                _unitOfWork.Repository<Product>().Update(productItem);

                items.Add(orderItem);

            }
            //get delivery method from repo
            var deliveryMethod = await _unitOfWork.Repository<DeliveryMethod>().GetByIdAsync(deliveryMethodId);

            //calc subtotal
            var subtotal = items.Sum(item => item.Price * item.Quantity);

            //check to see if order exists
            var spec = new OrderByPaymentIntentIdWithItemsSpecification(basket.PaymentIntentId);
            var existingOrder = await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
            if (existingOrder != null)
            {
                _unitOfWork.Repository<Order>().Delete(existingOrder);
                await _paymentService.CreateOrUpdatePaymentIntent(basket.PaymentIntentId);
            }
            //create order
            var order = new Order(items, buyerEmail, shippingAddress, deliveryMethod, subtotal, basket.PaymentIntentId);
            _unitOfWork.Repository<Order>().Add(order);
            //save to db
            var result = await _unitOfWork.Complete();
            if (result <= 0) return null;

            //return order
            return order;
        }

        public async Task<IReadOnlyList<DeliveryMethod>> GetDeliveryMethodsAsync()
        {
            return await _unitOfWork.Repository<DeliveryMethod>().ListAllAsync();
        }

        public async Task<Order> GetOrderByIdAsync(int id, string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(id, buyerEmail);
            return await _unitOfWork.Repository<Order>().GetEntityWithSpec(spec);
        }

        public async Task<IReadOnlyList<Order>> GetOrdersForUserAsync(string buyerEmail)
        {
            var spec = new OrdersWithItemsAndOrderingSpecification(buyerEmail);
            return await _unitOfWork.Repository<Order>().ListAsync(spec);
        }
    }
}