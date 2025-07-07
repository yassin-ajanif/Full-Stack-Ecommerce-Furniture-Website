import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { OrderDto } from '../Dtos/order.dto';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  

  
  loadImagesForThoseProducts(products: any[]): any[] {
    if (!products || !Array.isArray(products)) return products;
    products.forEach(product => {
      if (!product.image && product.id) {
        this.productservice.getProductImageById(product.id).subscribe(
          imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob);
            product.image = imageUrl;
          },
          error => {
            product.image = null;
          }
        );
      }
    });
    return products;
  }
  
  
 


  private getProductsPerOrderApiUrl = 'https://localhost:7023/api/Orders/productsPer';
  private getAllOrderapiUrl = 'https://localhost:7023/api/Orders/AllOrders';

  orders: OrderDto[] = [];

   constructor(private http: HttpClient,private productservice:ProductService) {}

  getAllOrders(): Observable<OrderDto[]> {
    return this.http.get<OrderDto[]>(`${this.getAllOrderapiUrl}`);
  }


    loaddAllOrdersFrDb(): void {
     
      this.getAllOrders().subscribe({
        next: (ordersRetreivedFromApi) => {
          this.orders = ordersRetreivedFromApi;
         
        },
        error: (err) => {
         // this.testOrdersResult = null;
         
        }
      });
    }

    
      loadProductsForOrder(orderId: string, orders: OrderDto[]): void {

    this.http.get<any[]>(`${this.getProductsPerOrderApiUrl}/${orderId}`).subscribe({
      next: (products) => {
        const order = orders.find(o => o.id === orderId);
        if (order) {

          order.products = this.loadImagesForThoseProducts(products);

          
        }
      },
      error: (err) => {
        console.error(`Error fetching products for order ${orderId}:`, err);
      }
    });
  }
  
  loadProductsForOrderIfNeeded(orderId: string): void {
    const order = this.orders.find(o => o.id === orderId);
    if (!order) return;
    // If products is already an array with items, do not fetch again
    if (Array.isArray(order.products) && order.products.length > 0) {
      return;
    }
    this.loadProductsForOrder(orderId, this.orders);
  }
 

}
