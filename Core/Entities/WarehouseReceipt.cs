using System;
using System.Collections.Generic;

namespace Core.Entities
{
    public class WarehouseReceipt : BaseEntity
    {
        public string Description { get; set; }
        public string AppUserId { get; set; }   
        public int Size { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public decimal Price { get; set;  }
        public int Quantity { get; set;  }

        public decimal GetTotal()
        {
            return Price * Quantity;
        }

      //  public IList<ReceiptDetail> ReceiptDetails { get; set; }
        

    }
}