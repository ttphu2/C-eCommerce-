using Core.Entities.Identity;

namespace Core.Entities
{
    public class Comment : BaseEntity
    {
        public string Content;
        public int Rate;       
        public Product Product { get; set; }
        public int ProductId { get; set; }
        public string AppUserId { get; set; }
    }
}