using System.Linq;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;
using Core.Entities.OrderAggregate;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Product, ProductToReturnDto>()
            .ForMember(d => d.ProductBrand, o => o.MapFrom(s => s.ProductBrand.Name))
            .ForMember(d => d.ProductType, o => o.MapFrom(s => s.ProductType.Name))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<ProductUrlResolver>())
            ;
            CreateMap<Core.Entities.Identity.Address, AddressDto>().ReverseMap();
            CreateMap<CustomerBasketDto, CustomerBasket>();
            CreateMap<BasketItemDto, BasketItem>();
            CreateMap<AddressDto, Core.Entities.OrderAggregate.Address>();
            CreateMap<UserToUpdateDto,AppUser>().ReverseMap();
            CreateMap<AppUser,UserDto>().ReverseMap();
            CreateMap<Order, OrderToReturnDto>()
            .ForMember(d => d.DeliveryMethod, o => o.MapFrom(s => s.DeliveryMethod.ShortName))
            .ForMember(d => d.ShippingPrice, o => o.MapFrom(s => s.DeliveryMethod.Price));
             CreateMap<OrderToCreateDto, Order>();
            
            CreateMap<OrderItem, OrderItemDto>()
            .ForMember(d => d.ProductId, o => o.MapFrom(s => s.ItemOrdered.ProductItemId))
            .ForMember(d => d.ProductName, o => o.MapFrom(s => s.ItemOrdered.ProductName))
            .ForMember(d => d.Size, o => o.MapFrom(s => s.ItemOrdered.Size))
            .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.ItemOrdered.PictureUrl))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<OrderItemUrlResolver>())
            ;
            CreateMap<ProductCreateDto, Product>();
            CreateMap<Photo, PhotoToReturnDto>()
                .ForMember(d => d.PictureUrl, 
                    o => o.MapFrom<PhotoUrlResolver>());
            CreateMap<ProductSize, ProductSizeToReturnDto>()
            .ForMember(d => d.ProductName, o => o.MapFrom(s => s.Product.Name));
            CreateMap<ProductSize, WarehouseToReturnDto>()
            .ForMember(d => d.Name, o => o.MapFrom(s => s.Product.Name))
            .ForMember(d => d.Description, o => o.MapFrom(s => s.Product.Description))
            .ForMember(d => d.Price, o => o.MapFrom(s => s.Product.Price))
            .ForMember(d => d.ProductId, o => o.MapFrom(s => s.Product.Id))
           // .ForMember(d => d.PictureUrl, o => o.MapFrom(s => s.Product.Photos.FirstOrDefault(x => x.IsMain).PictureUrl))
            .ForMember(d => d.PictureUrl, o => o.MapFrom<WarehouseUrlResolver>());

            CreateMap<WishList, WishListDto>()
             .ForMember(d => d.Name, o => o.MapFrom(s => s.Product.Name))
             .ForMember(d => d.Description, o => o.MapFrom(s => s.Product.Description))
             .ForMember(d => d.Price, o => o.MapFrom(s => s.Product.Price))
             .ForMember(d => d.PictureUrl, o => o.MapFrom<WishListUrlResolver>());
            ;
            CreateMap<WarehouseReceipt, WarehouseReceiptDto>().ReverseMap();
            CreateMap<WarehouseReceipt, WarehouseReceiptToReturnDto>();
             CreateMap<OrderItemDto, BasketItem>()
             .ForMember(d => d.Id, o => o.MapFrom(s => s.ProductId));
            

        }
    }
}