
export class getProductDTO {
    id: number;
    name: string;
    description: string | null;
    stockQuantity: number;
    price: number;
    categoryID: number;
    imageUrl : string | null
  
    constructor(
        id: number,
        name: string,
        description: string | null = null,
        stockQuantity: number,
        price: number,
        categoryID: number,
        imageUrl : string | null = null
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stockQuantity = stockQuantity;
        this.price = price;
        this.categoryID = categoryID;
        this.imageUrl = imageUrl
    }
  }
  