import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  products  = [
    {
      id: 1,
      name: "Modern Sofa",
      description: "A comfortable 3-seater sofa with a sleek, modern design.",
      price: 599.99,
      oldPrice: 700,
      category: "Living Room",
      stock: 20,
      rating: 4.8,
      imageUrl: "Assets/Shared/image 1.png",
    },
    {
      id: 2,
      name: "Dining Table Set",
      description: "Wooden dining table with 6 matching chairs.",
      price: 599.99,
      oldPrice: 899.99,
      category: "Dining Room",
      stock: 15,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 2.png",
    },
    {
      id: 3,
      name: "King Size Bed",
      description: "Spacious king-size bed with a cushioned headboard.",
      price: 599.99,
      oldPrice: 749.99,
      category: "Bedroom",
      stock: 10,
      rating: 4.9,
      imageUrl: "Assets/Shared/image 3.png",
    },
    {
      id: 4,
      name: "Office Desk",
      description: "Ergonomic office desk with cable management features.",
      price: 599.99,
      oldPrice: 199.99,
      category: "Office",
      stock: 25,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 4.png",
    },
    {
      id: 5,
      name: "Recliner Chair",
      description: "Comfortable recliner chair with adjustable back and footrest.",
      price: 599.99,
      oldPrice: 299.99,
      category: "Living Room",
      stock: 18,
      rating: 4.6,
      imageUrl: "Assets/Shared/image 5.png",
    },
    {
      id: 6,
      name: "Coffee Table",
      description: "Stylish wooden coffee table with a glass top.",
      price: 599.99,
      oldPrice: 149.99,
      category: "Living Room",
      stock: 30,
      rating: 4.4,
      imageUrl: "Assets/Shared/image 6.png",
    },
    {
      id: 7,
      name: "Bookshelf",
      description: "Tall wooden bookshelf with 5 spacious shelves.",
      price: 599.99,
      oldPrice: 199.99,
      category: "Office",
      stock: 40,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 7.png",
    },
    {
      id: 8,
      name: "Accent Chair",
      description: "A chic accent chair with vibrant upholstery and sturdy legs.",
      price: 599.99,
      oldPrice: 179.99,
      category: "Bedroom",
      stock: 22,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 8.png",
    },
    {
      id: 9,
      name: "Wardrobe",
      description: "Spacious wardrobe with sliding doors and ample storage space.",
      price: 599.99,
      oldPrice: 849.99,
      category: "Bedroom",
      stock: 8,
      rating: 4.8,
      imageUrl: "Assets/Shared/image 1.png", // Repeated from image1
    },
    {
      id: 10,
      name: "Bar Stool",
      description: "Adjustable height bar stool with a comfortable seat.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Dining Room",
      stock: 50,
      rating: 4.6,
      imageUrl: "Assets/Shared/image 2.png", // Repeated from image2
    },
    {
      id: 11,
      name: "Outdoor Patio Set",
      description: "Weather-resistant patio set with a table and 4 chairs.",
      price: 599.99,
      oldPrice: 599.99,
      category: "Outdoor",
      stock: 12,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 3.png", // Repeated from image3
    },
    {
      id: 12,
      name: "Nightstand",
      description: "Compact nightstand with a drawer and open shelf.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Bedroom",
      stock: 35,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 4.png", // Repeated from image4
    },
  ];
}
