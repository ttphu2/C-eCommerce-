

namespace Core.Entities
{
    public class WishList : BaseEntity
    {
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public string AppUserId { get; set; }
    }
}