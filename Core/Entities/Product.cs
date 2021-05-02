using System.Collections.Generic;
using System.Linq;

namespace Core.Entities
{
    public class Product : BaseEntity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public ProductType ProductType { get; set; }
        public int ProductTypeId { get; set; }
        public ProductBrand ProductBrand { get; set; }
        public int ProductBrandId { get; set; }
        private readonly List<Photo> _photos = new List<Photo>();
        public IReadOnlyList<Photo> Photos => _photos.AsReadOnly();
        private readonly List<ProductSize> _productSizes = new List<ProductSize>();
        public IReadOnlyList<ProductSize> ProductSizes => _productSizes.AsReadOnly();
        public void DecrementQuantity(int id, int Quantity)
        {
            var productSize = _productSizes.Find(x => x.Id == id);
            productSize.Quantity = productSize.Quantity - Quantity;

        }
        public void AddProductSize(int size, int quantity = 1)
        {
            var productSize = new ProductSize
            {
                Size = size,
                Quantity = quantity
            };

            _productSizes.Add(productSize);
        }
        public void AddOrUpdateProductSize(int size, int quantity = 1)
        {
            var productSize = _productSizes.Find(x => x.Size == size);
            if (productSize != null)
            {
                productSize.Quantity = quantity;
            }
            else
            {
                AddProductSize(size, quantity);
            }
        }

        public void RemoveProductSize(int id)
        {
            var productSize = _productSizes.Find(x => x.Id == id);
            _productSizes.Remove(productSize);
        }

        public void AddPhoto(string pictureUrl, string fileName, bool isMain = false)
        {
            var photo = new Photo
            {
                FileName = fileName,
                PictureUrl = pictureUrl
            };

            if (_photos.Count == 0) photo.IsMain = true;

            _photos.Add(photo);
        }
        public void RemovePhoto(int id)
        {
            var photo = _photos.Find(x => x.Id == id);
            _photos.Remove(photo);
        }

        public void SetMainPhoto(int id)
        {
            var currentMain = _photos.SingleOrDefault(item => item.IsMain);
            foreach (var item in _photos.Where(item => item.IsMain))
            {
                item.IsMain = false;
            }

            var photo = _photos.Find(x => x.Id == id);
            if (photo != null)
            {
                photo.IsMain = true;
                if (currentMain != null) currentMain.IsMain = false;
            }
        }
    }
}