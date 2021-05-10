using Core.Entities;

namespace Core.Specifications
{
    public class WishWithProductSpecification : BaseSpecification<WishList>
    {

        public WishWithProductSpecification(string id) : base(x => x.AppUserId == id)
        {
            AddInclude(x => x.Product);
            AddInclude(x => x.Product.Photos);
        }
    }
}