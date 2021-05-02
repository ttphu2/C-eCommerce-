namespace API.Dtos
{
    public class WarehouseToReturnDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public string PictureUrl { get; set; }
        public int Size { get; set; }
        public int Quantity { get; set; }
        public int ProductId { get; set; }

    }
}