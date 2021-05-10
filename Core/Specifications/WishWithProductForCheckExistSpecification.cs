using Core.Entities;

namespace Core.Specifications
{
    public class WishWithProductForCheckExistSpecification : BaseSpecification<WishList>
    {

        public WishWithProductForCheckExistSpecification(string id, int productId) : base(x => x.AppUserId == id && x.ProductId == productId)
        {
            AddInclude(x => x.Product);

        }
    }
}