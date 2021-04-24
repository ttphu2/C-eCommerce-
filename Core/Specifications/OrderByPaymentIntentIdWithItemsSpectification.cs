using System;
using System.Linq.Expressions;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderByPaymentIntentIdWithItemsSpectification : BaseSpectification<Order>
    {
        public OrderByPaymentIntentIdWithItemsSpectification(string paymentIntentId) 
        : base(o => o.PaymentIntentId == paymentIntentId)
        {
        }
    }
}