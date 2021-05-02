using System.Linq;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class WarehouseUrlResolver : IValueResolver<ProductSize, WarehouseToReturnDto, string>
    {
        private readonly IConfiguration _config;
        public WarehouseUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(ProductSize source, WarehouseToReturnDto destination, string destMember, ResolutionContext context)
        {
            var photo = source.Product.Photos.FirstOrDefault(x => x.IsMain);
            
            if (photo != null)
            {
                return _config["ApiUrl"] + photo.PictureUrl;
            }

            return _config["ApiUrl"] + "images/products/placeholder.png";
        }
    }
}