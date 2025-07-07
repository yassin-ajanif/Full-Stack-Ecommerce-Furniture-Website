namespace SharedLayer.Dtos
{
    public class OrderedProductDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public byte[] Image { get; set; } // Updated to byte[] for varbinary data
        public string Price { get; set; }
        public string OrderId { get; set; }
    }
}