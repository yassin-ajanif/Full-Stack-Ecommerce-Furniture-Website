// product-category.dto.ts

export class ProductCategoryDTO {
    ID: number;
    name: string;
    description: string | null;
  
    constructor(name: string, ID: number = 0,   description: string | null = null) {
      this.ID = ID;
      this.name = name;
      this.description = description;
    }
  }
  