namespace SharedLayer.Dtos
{
    public class OrderDto
    {
        public string Id { get; set; }
        public string Date { get; set; }
        public string Status { get; set; } // 'Shipped', 'Delivered', 'Cancelled'
        public string Total { get; set; }
        public List<OrderedProductDto>? Products { get; set; } // Allow Products to be null
    }
}