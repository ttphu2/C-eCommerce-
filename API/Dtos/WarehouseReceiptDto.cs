using System;
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class WarehouseReceiptDto
    {
        [Required]
        public string Description { get; set; }
        [Required]
        public int Size { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        [RegularExpression(@"^\$?([0-9]{1,3},([0-9]{3},)*[0-9]{3}|[0-9]+)(.[0-9][0-9])?$",
            ErrorMessage = "Price must be a decimal (e.g 20.30)")]
        public decimal Price { get; set; }
        [Required]
        public int Quantity { get; set; }

    }
}