using System;
using System.Collections.Generic;
using Core.Entities.OrderAggregate;

namespace API.Dtos
{
    public class OrderToCreateDto
    {
        
        public Address ShipToAddress { get; set; }
        public int DeliveryMethodId { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
        public string Status { get; set; } 
    }
}