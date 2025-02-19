export class ProductDTO {
  id: number;
  name: string;
  description: string | null;
  stockQuantity: number;
  price: number;
  categoryID: number;
  image: File | null; // This is updated to represent the image as a File instead of a base64 string.

  constructor(
      id: number,
      name: string,
      description: string | null = null,
      stockQuantity: number,
      price: number,
      categoryID: number,
      image: File | null = null // This is updated to accept a File object for the image.
  ) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.stockQuantity = stockQuantity;
      this.price = price;
      this.categoryID = categoryID;
      this.image = image;
  }
}
