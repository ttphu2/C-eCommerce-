using Core.Entities;

namespace Core.Specifications
{
    public class WarehouseWithPaginationSpecification : BaseSpecification<ProductSize>
    {
        public WarehouseWithPaginationSpecification(WarehouseSpecParams productParams)
        : base(x =>
             (string.IsNullOrEmpty(productParams.Search) || x.Product.Name.ToLower().Contains(productParams.Search))

        )
        {
            AddInclude(x => x.Product);
            AddInclude(x => x.Product.Photos);
            //sắp xếp
            AddOrderBy(x => x.Id);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);
            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.ProductId);
                        break;
                    case "priceDesc":
                        AddOrderByDescending(p => p.Size);
                        break;
                    default:
                        AddOrderBy(x => x.Quantity);
                        break;
                }
            }
        }
        public WarehouseWithPaginationSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.Product);
            AddInclude(x => x.Product.Photos);
        }
    }
}