import { EventEmitter, inject, Injectable, OnInit } from '@angular/core';
import { ProductDTO } from '../Dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { getProductDTO } from '../Dtos/getProduct.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

  constructor() { }
  
  httpClient:HttpClient = inject(HttpClient)
  private baseUrl : string = "https://localhost:7023/api/Products"
  
  private serachProductByLetterEndPoint = "https://localhost:7023/api/Products"
 

  products  = [
    {
      id: 1,
      name: "Modern Sofa 1",
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
      name: "Dining Table Set 2",
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
      name: "King Size Bed 3",
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
      name: "Office Desk 4",
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
      name: "Recliner Chair 5",
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
      name: "Coffee Table 6",
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
      name: "Bookshelf 7",
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
      name: "Accent Chair 8",
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
      name: "Wardrobe 9",
      description: "Spacious wardrobe with sliding doors and ample storage space.",
      price: 599.99,
      oldPrice: 849.99,
      category: "Bedroom",
      stock: 8,
      rating: 4.8,
      imageUrl: "Assets/Shared/image 8.png", // Repeated from image1
    },
    {
      id: 10,
      name: "Bar Stool 10",
      description: "Adjustable height bar stool with a comfortable seat.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Dining Room",
      stock: 50,
      rating: 4.6,
      imageUrl: "Assets/Shared/image 7.png", // Repeated from image2
    },
    {
      id: 11,
      name: "Outdoor Patio Set 11",
      description: "Weather-resistant patio set with a table and 4 chairs.",
      price: 599.99,
      oldPrice: 599.99,
      category: "Outdoor",
      stock: 12,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 6.png", // Repeated from image3
    },
    {
      id: 12,
      name: "Nightstand 12",
      description: "Compact nightstand with a drawer and open shelf.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Bedroom",
      stock: 35,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 5.png", // Repeated from image4
    },

    {
      id: 1,
      name: "Modern Sofa 13",
      description: "A comfortable 3-seater sofa with a sleek, modern design.",
      price: 599.99,
      oldPrice: 700,
      category: "Living Room",
      stock: 20,
      rating: 4.8,
      imageUrl: "Assets/Shared/image 4.png",
    },
    {
      id: 2,
      name: "Dining Table Set 14",
      description: "Wooden dining table with 6 matching chairs.",
      price: 599.99,
      oldPrice: 899.99,
      category: "Dining Room",
      stock: 15,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 3.png",
    },
    {
      id: 3,
      name: "King Size Bed 15",
      description: "Spacious king-size bed with a cushioned headboard.",
      price: 599.99,
      oldPrice: 749.99,
      category: "Bedroom",
      stock: 10,
      rating: 4.9,
      imageUrl: "Assets/Shared/image 2.png",
    },
    {
      id: 4,
      name: "Office Desk 16",
      description: "Ergonomic office desk with cable management features.",
      price: 599.99,
      oldPrice: 199.99,
      category: "Office",
      stock: 25,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 1.png",
    },
    {
      id: 5,
      name: "Recliner Chair 17",
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
      name: "Coffee Table 18",
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
      name: "Bookshelf 19",
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
      name: "Accent Chair 20",
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
      name: "Wardrobe 21",
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
      name: "Bar Stool 22",
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
      name: "Outdoor Patio Set 23",
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
      name: "Nightstand 24",
      description: "Compact nightstand with a drawer and open shelf.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Bedroom",
      stock: 35,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 4.png", // Repeated from image4
    },

    {
      id: 1,
      name: "Modern Sofa 25",
      description: "A comfortable 3-seater sofa with a sleek, modern design.",
      price: 599.99,
      oldPrice: 700,
      category: "Living Room",
      stock: 20,
      rating: 4.8,
      imageUrl: "Assets/Shared/image 4.png",
    },
    {
      id: 2,
      name: "Dining Table Set 26",
      description: "Wooden dining table with 6 matching chairs.",
      price: 599.99,
      oldPrice: 899.99,
      category: "Dining Room",
      stock: 15,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 3.png",
    },
    {
      id: 3,
      name: "King Size Bed 27",
      description: "Spacious king-size bed with a cushioned headboard.",
      price: 599.99,
      oldPrice: 749.99,
      category: "Bedroom",
      stock: 10,
      rating: 4.9,
      imageUrl: "Assets/Shared/image 2.png",
    },
    {
      id: 4,
      name: "Office Desk 28",
      description: "Ergonomic office desk with cable management features.",
      price: 599.99,
      oldPrice: 199.99,
      category: "Office",
      stock: 25,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 1.png",
    },
    {
      id: 5,
      name: "Recliner Chair 29",
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
      name: "Coffee Table 30",
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
      name: "Bookshelf 31",
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
      name: "Accent Chair 32",
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
      name: "Wardrobe 33",
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
      name: "Bar Stool 34",
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
      name: "Outdoor Patio Set 35",
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
      name: "Nightstand 36",
      description: "Compact nightstand with a drawer and open shelf.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Bedroom",
      stock: 35,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 4.png", // Repeated from image4
    },

    {
      id: 1,
      name: "Modern Sofa 1",
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
      name: "Dining Table Set 2",
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
      name: "King Size Bed 3",
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
      name: "Office Desk 4",
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
      name: "Recliner Chair 5",
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
      name: "Coffee Table 6",
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
      name: "Bookshelf 7",
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
      name: "Accent Chair 8",
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
      name: "Wardrobe 9",
      description: "Spacious wardrobe with sliding doors and ample storage space.",
      price: 599.99,
      oldPrice: 849.99,
      category: "Bedroom",
      stock: 8,
      rating: 4.8,
      imageUrl: "Assets/Shared/image 8.png", // Repeated from image1
    },
    {
      id: 10,
      name: "Bar Stool 10",
      description: "Adjustable height bar stool with a comfortable seat.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Dining Room",
      stock: 50,
      rating: 4.6,
      imageUrl: "Assets/Shared/image 7.png", // Repeated from image2
    },
    {
      id: 11,
      name: "Outdoor Patio Set 11",
      description: "Weather-resistant patio set with a table and 4 chairs.",
      price: 599.99,
      oldPrice: 599.99,
      category: "Outdoor",
      stock: 12,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 6.png", // Repeated from image3
    },
    {
      id: 12,
      name: "Nightstand 12",
      description: "Compact nightstand with a drawer and open shelf.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Bedroom",
      stock: 35,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 5.png", // Repeated from image4
    },

    {
      id: 1,
      name: "Modern Sofa 13",
      description: "A comfortable 3-seater sofa with a sleek, modern design.",
      price: 599.99,
      oldPrice: 700,
      category: "Living Room",
      stock: 20,
      rating: 4.8,
      imageUrl: "Assets/Shared/image 4.png",
    },
    {
      id: 2,
      name: "Dining Table Set 14",
      description: "Wooden dining table with 6 matching chairs.",
      price: 599.99,
      oldPrice: 899.99,
      category: "Dining Room",
      stock: 15,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 3.png",
    },
    {
      id: 3,
      name: "King Size Bed 15",
      description: "Spacious king-size bed with a cushioned headboard.",
      price: 599.99,
      oldPrice: 749.99,
      category: "Bedroom",
      stock: 10,
      rating: 4.9,
      imageUrl: "Assets/Shared/image 2.png",
    },
    {
      id: 4,
      name: "Office Desk 16",
      description: "Ergonomic office desk with cable management features.",
      price: 599.99,
      oldPrice: 199.99,
      category: "Office",
      stock: 25,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 1.png",
    },
    {
      id: 5,
      name: "Recliner Chair 17",
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
      name: "Coffee Table 18",
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
      name: "Bookshelf 19",
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
      name: "Accent Chair 20",
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
      name: "Wardrobe 21",
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
      name: "Bar Stool 22",
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
      name: "Outdoor Patio Set 23",
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
      name: "Nightstand 24",
      description: "Compact nightstand with a drawer and open shelf.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Bedroom",
      stock: 35,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 4.png", // Repeated from image4
    },

    {
      id: 1,
      name: "Modern Sofa 25",
      description: "A comfortable 3-seater sofa with a sleek, modern design.",
      price: 599.99,
      oldPrice: 700,
      category: "Living Room",
      stock: 20,
      rating: 4.8,
      imageUrl: "Assets/Shared/image 4.png",
    },
    {
      id: 2,
      name: "Dining Table Set 26",
      description: "Wooden dining table with 6 matching chairs.",
      price: 599.99,
      oldPrice: 899.99,
      category: "Dining Room",
      stock: 15,
      rating: 4.7,
      imageUrl: "Assets/Shared/image 3.png",
    },
    {
      id: 3,
      name: "King Size Bed 27",
      description: "Spacious king-size bed with a cushioned headboard.",
      price: 599.99,
      oldPrice: 749.99,
      category: "Bedroom",
      stock: 10,
      rating: 4.9,
      imageUrl: "Assets/Shared/image 2.png",
    },
    {
      id: 4,
      name: "Office Desk 28",
      description: "Ergonomic office desk with cable management features.",
      price: 599.99,
      oldPrice: 199.99,
      category: "Office",
      stock: 25,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 1.png",
    },
    {
      id: 5,
      name: "Recliner Chair 29",
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
      name: "Coffee Table 30",
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
      name: "Bookshelf 31",
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
      name: "Accent Chair 32",
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
      name: "Wardrobe 33",
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
      name: "Bar Stool 34",
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
      name: "Outdoor Patio Set 35",
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
      name: "Nightstand 36",
      description: "Compact nightstand with a drawer and open shelf.",
      price: 599.99,
      oldPrice: 89.99,
      category: "Bedroom",
      stock: 35,
      rating: 4.5,
      imageUrl: "Assets/Shared/image 4.png", // Repeated from image4
    },
  ];
  
  productsToLoadAtShopPage !: ProductDTO[] ;
       
  productsSentFromPaginationEvent = new EventEmitter<ProductDTO[]>() ;
    

    loadProductsPageNumber(PageNumber: number, productsNumberPerPage: number) {

      const startIndexProduct = (PageNumber - 1) * productsNumberPerPage;
      const endIndexProduct = startIndexProduct + productsNumberPerPage;
      // Return the sliced array of products for the specified page

      //this.productsToLoadAtShopPage = this.products.slice(startIndexProduct, endIndexProduct);      
     
      //this.productsSentFromPaginationEvent.emit(this.productsToLoadAtShopPage)
    }
    
    

    sendProductAddedThroughApi(addProductFromData:FormData): Observable<boolean> {
      
      // Send the data to the backend
      return this.httpClient.post(this.baseUrl+'/Addproduct', addProductFromData).pipe(

        map(()=> true),
        catchError(()=>of(false))
      )
        
    }
    
    
    updateProduct(updateProductFromData: FormData): Observable<any> {

      return this.httpClient.put(`${this.baseUrl}/Updateproduct`, updateProductFromData);
    
    }

    deleteProductByID(id: number): Observable<boolean> {
      return this.httpClient.delete<void>(`${this.baseUrl}/delete/${id}`).pipe(
        map(() => true), // If deletion succeeds, return true
        catchError(() => of(false)) // If an error occurs, return false
      );
    }

    searchProductsByPrefixNameAsync(namePrefix: string): Observable<getProductDTO[]> {
      
      // If namePrefix is empty, return an empty array as Observable
      if (namePrefix.trim() === '') {
        return of([]);  // Return an empty observable array
      }
        
      return this.httpClient.get<getProductDTO[]>(
        `${this.serachProductByLetterEndPoint}/search?namePrefix=${namePrefix}`
      );
    }
    
    getProductImageById(productId: number): Observable<Blob> {
      return this.httpClient.get(`${this.baseUrl}/GetProductImage/${productId}`, 
        { responseType: 'blob' });
    }
    
    
     
      
    
    

}  
