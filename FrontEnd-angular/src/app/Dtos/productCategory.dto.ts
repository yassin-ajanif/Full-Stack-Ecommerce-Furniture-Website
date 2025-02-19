// product-category.dto.ts

export class ProductCategoryDTO {
    id: number;
    name: string;
    description: string | null;
  
    constructor(name: string, ID: number = 0,   description: string | null = null) {
      this.id = ID;
      this.name = name;
      this.description = description;
    }
  }
  