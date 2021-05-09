using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrderWithFiltersForCountSpecification :BaseSpecification<Order>
    {
        public OrderWithFiltersForCountSpecification(OrderSpecParams orderParams)
        :base(x =>  
            (string.IsNullOrEmpty(orderParams.Search)|| x.BuyerEmail.ToLower().Contains(orderParams.Search)) &&
            (string.IsNullOrEmpty(orderParams.Status) || x.Status.ToString() == orderParams.Status) 
        )
        {

        }
    }
}