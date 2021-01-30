using Core.Entities;

namespace Core.Specifications
{
    public class ProductWithTypesAndBrandsSpectification : BaseSpectification<Product>
    {
        public ProductWithTypesAndBrandsSpectification()
        {
            AddInclude(x=>x.ProductType);
            AddInclude(x=>x.ProductBrand);
        }
        public ProductWithTypesAndBrandsSpectification(int id): base(x=>x.Id==id)
        {
            AddInclude(x=>x.ProductType);
            AddInclude(x=>x.ProductBrand);
        }
    }
}