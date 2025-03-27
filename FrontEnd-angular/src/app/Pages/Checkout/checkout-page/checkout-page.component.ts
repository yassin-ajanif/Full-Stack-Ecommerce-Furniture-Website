import { Component, inject, OnDestroy } from '@angular/core';
import { ShopHeroComponent } from "../../../SharedComponents/shop-hero/shop-hero.component";
import { ServiceAndWarrantyComponent } from "../../../SharedComponents/service-and-warranty/service-and-warranty.component";
import { productToBuy } from '../../../Dtos/productToBuy.dto';
import { CheckoutService } from '../../../Services/checkoutService.service';
import { overLayService } from '../../../Services/overLayService.service';
import { SpinnerService } from '../../../Services/spinner-service.service';
import { Subscription } from 'rxjs';
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'checkout-page',
  imports: [ShopHeroComponent, ServiceAndWarrantyComponent,FormsModule,CommonModule],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent  {
  

  checkoutService = inject(CheckoutService)
  overlayService = inject(overLayService)
  spinnerService = inject(SpinnerService)
  transactionSup! : Subscription 
  router = inject(Router)

  checkoutData = {
    firstName: '',
    lastName: '',
    companyName: '',
    country: '',
    streetAddress: '',
    city: '',
    province: '',
    zipCode: '',
    phone: '',
    email: '',
    additionalInfo: '',
    payment: ''
  };

  ngOnInit(): void {
    this.setDefaultValues();
    this.loadCartItems()
  }

  countries: string[] = [
    'Sri Lanka',
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'India'
  ];

  cartItems: any[] = [];
  // Function to load or set default values for all inputs
  setDefaultValues() {
    this.checkoutData = {
      firstName: 'John',
      lastName: 'Doe',
      companyName: 'ACME Inc.',
      country: 'Sri Lanka',
      streetAddress: '123 Main Street',
      city: 'Colombo',
      province: 'Western Province',
      zipCode: '12345',
      phone: '0771234567',
      email: 'admin.doe@example.com',
      additionalInfo: 'Leave at the front door',
      payment: 'bank' // Default payment method (e.g., Direct Bank Transfer)
    };


  }

  loadCartItems(): void {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData);
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  PlaceOrder(){

    // Step 1: Retrieve products from localStorage (using 'cart' key)
      const productsString = localStorage.getItem('cart');
      const products = productsString ? JSON.parse(productsString) : [];
  
      if(!products) return
      // Step 2: Map the retrieved data to an array of productToBuy DTOs
      const productDtos: productToBuy[] = products.map((product: any) => {
        return new productToBuy(product.name, product.id, product.quantity, product.price);
    });
    
      this.spinnerService.showSpinner()
      // Step 3: Call the processCheckout function from CheckoutService
       this.checkoutService.processCheckout(productDtos).subscribe(
         {
          next: (transaction)=>{ 

            this.overlayService.showOverLay_Without_ConfirmationMode(transaction.message) 
            this.spinnerService.hideSpinner()
            // we remove the proudct added to cart from local storage on the transaction is succeded
            localStorage.removeItem('cart')
            this.router.navigate(['Shop'])
          },
          error: (error)=>{
            this.overlayService.showOverLay_Without_ConfirmationMode('something went wrong try later') 
            this.spinnerService.hideSpinner()
          }
         }
      
      );
    
  }
}
