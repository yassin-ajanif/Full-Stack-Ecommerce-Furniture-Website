
export class getProductDTO {
    id: number;
    name: string;
    description: string | null;
    stockQuantity: number;
    price: number;
    categoryID: number;
  
    constructor(
        id: number,
        name: string,
        description: string | null = null,
        stockQuantity: number,
        price: number,
        categoryID: number,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.stockQuantity = stockQuantity;
        this.price = price;
        this.categoryID = categoryID;
    }
  }
  