namespace Core.Entities
{
    public class ProductSize : BaseEntity
    {
        public int Size { get; set; }
        public int Quantity { get; set; }
        public Product Product { get; set; }
        public int ProductId { get; set; }
    }
}