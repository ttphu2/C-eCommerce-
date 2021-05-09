using Core.Entities;
using Core.Entities.OrderAggregate;

namespace Core.Specifications
{
    public class OrdersAllWithItemsAndOrderingSpecification : BaseSpecification<Order>
    {
        public OrdersAllWithItemsAndOrderingSpecification(OrderSpecParams orderParams)
         :base(x =>  
            (string.IsNullOrEmpty(orderParams.Search)|| x.BuyerEmail.ToLower().Contains(orderParams.Search)) &&
            (string.IsNullOrEmpty(orderParams.Status) || x.Status.ToString() == orderParams.Status)
        )
        {
            //lấy dữ liệu eager
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
            //sắp xếp
            AddOrderByDescending(o => o.OrderDate);
            ApplyPaging(orderParams.PageSize * (orderParams.PageIndex - 1), orderParams.PageSize);
            if (!string.IsNullOrEmpty(orderParams.Sort))
            {
                // switch (orderParams.Sort)
                // {
                //     case "priceAsc":
                //         AddOrderBy(p => p.Price);
                //         break;
                //     case "priceDesc":
                //         AddOrderByDescending(p => p.Price);
                //         break;
                //     default:
                //         AddOrderBy(x => x.Name);
                //         break;
                // }
            }
        }
        public OrdersAllWithItemsAndOrderingSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(o => o.OrderItems);
            AddInclude(o => o.DeliveryMethod);
        }
    }
}