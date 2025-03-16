
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { productToBuy } from '../Dtos/productToBuy.dto'; // Import the DTO if necessary
import { UserToken } from '../Dtos/userToken.dto';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private checkoutEndPoint = 'https://localhost:7023/api/Checkout/checkoutProducts';  // Set the API endpoint URL here

  constructor(private http: HttpClient,private authService:AuthServiceService) {}

  // Method to process the checkout
  processCheckout(products: productToBuy[]): Observable<any> {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.userToken?.token}`,
      'Content-Type': 'application/json'
    });

    // Send POST request to the API with the products list
    return this.http.post<any>(this.checkoutEndPoint, products, { headers });
    
  }
}
