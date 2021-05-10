using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class WishListDto
    {
        public int Id { get; set; }
        public int ProductId { get; set; }  
        public string AppUserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }



    }
}