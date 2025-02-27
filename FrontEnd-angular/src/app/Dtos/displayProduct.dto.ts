
export class displayProductDTO {
    id: number;
    name: string;
    description: string | null;
    stockQuantity: number;
    price: number;
    categoryName: string;
    imageUrl : string | null
  
    constructor(
        id: number,
        name: string,
        description: string | null = null,
        stockQuantity: number,
        price: number,
        categoryName: string,
        imageUrl : string | null = null
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stockQuantity = stockQuantity;
        this.price = price;
        this.categoryName = categoryName;
        this.imageUrl = imageUrl
    }
  }
  