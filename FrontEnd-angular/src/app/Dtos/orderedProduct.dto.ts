
// we are using interfaces here because they are better than class 
// we used previously

export interface OrderedProductDto {
  id: string;
  name: string;
  image: string; // Base64-encoded string representation of the image
  price: string;
  orderId: string;
}
