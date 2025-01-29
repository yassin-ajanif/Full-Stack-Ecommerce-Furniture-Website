export class  Product {
    id: number;
    name: string;
    description: string;
    price: number;
    oldPrice: number;
    category: string;
    stock: number;
    rating: number;
    imageUrl: string;
  
    constructor(
      id: number,
      name: string,
      description: string,
      price: number,  
      oldPrice: number,  
      category: string,
      stock: number,
      rating: number,
      imageUrl: string
    ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.price = price;
      this.oldPrice = oldPrice ;
      this.category = category;
      this.stock = stock;
      this.rating = rating;
      this.imageUrl = imageUrl;
    }
  }
  