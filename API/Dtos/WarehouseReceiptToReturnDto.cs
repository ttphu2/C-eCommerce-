using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class WarehouseReceiptToReturnDto
    {

        public string Description { get; set; }
        public string AppUserId { get; set; }
        public int Size { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}