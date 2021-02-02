using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpectification : BaseSpectification<Product>
    {
        public ProductWithTypesAndBrandsSpectification(ProductSpecParams productParams)
        :base(x =>  
            (string.IsNullOrEmpty(productParams.Search)|| x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.BrandId.HasValue || x.ProductBrandId== productParams.BrandId) && 
            (!productParams.TypeId.HasValue || x.ProductTypeId==productParams.TypeId)
        )
        {
            //lấy dữ liệu eager
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
            //sắp xếp
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex-1),productParams.PageSize);
            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Price);
                        break;
                    default:
                        AddOrderBy(x => x.Name);
                        break;
                }
            }
        }
        public ProductWithTypesAndBrandsSpectification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductType);
            AddInclude(x => x.ProductBrand);
        }
    }
}