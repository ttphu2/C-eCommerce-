using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class ProductToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public string ProductType { get; set; }
        public string ProductBrand { get; set; }
        public IEnumerable<PhotoToReturnDto> Photos { get; set; }
        public IEnumerable<ProductSizeToReturnDto> ProductSizes { get; set; }
        public IEnumerable<CommentToReturnDto> Comments { get; set; }
    }
}