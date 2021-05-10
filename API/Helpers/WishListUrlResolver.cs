using System.Linq;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class WishListUrlResolver : IValueResolver<WishList, WishListDto, string>
    {
        private readonly IConfiguration _config;
        public WishListUrlResolver(IConfiguration config)
        {
            _config = config;
        }

       public string Resolve(WishList source, WishListDto destination, string destMember, ResolutionContext context)
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