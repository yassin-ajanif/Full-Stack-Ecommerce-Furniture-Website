import { Component, inject, OnDestroy } from '@angular/core';
import { ShopHeroComponent } from "../../../SharedComponents/shop-hero/shop-hero.component";
import { ServiceAndWarrantyComponent } from "../../../SharedComponents/service-and-warranty/service-and-warranty.component";
import { productToBuy } from '../../../Dtos/productToBuy.dto';
import { CheckoutService } from '../../../Services/checkoutService.service';
import { overLayService } from '../../../Services/overLayService.service';
import { SpinnerService } from '../../../Services/spinner-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'checkout-page',
  imports: [ShopHeroComponent, ServiceAndWarrantyComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css'
})
export class CheckoutPageComponent  {
  

  checkoutService = inject(CheckoutService)
  overlayService = inject(overLayService)
  spinnerService = inject(SpinnerService)
  transactionSup! : Subscription 

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
          },
          error: (error)=>{
            this.overlayService.showOverLay_Without_ConfirmationMode('something went wrong try later') 
            this.spinnerService.hideSpinner()
          }
         }
      
      );
    
  }
  
  
  
}
