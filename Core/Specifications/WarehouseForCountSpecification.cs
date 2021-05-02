using Core.Entities;

namespace Core.Specifications
{
    public class WarehouseForCountSpecification :BaseSpecification<ProductSize>
    {
        public WarehouseForCountSpecification(WarehouseSpecParams productParams)
        :base(x =>  
            (string.IsNullOrEmpty(productParams.Search)|| x.Product.Name.ToLower().Contains(productParams.Search))
        )
        {

        }
    }
}