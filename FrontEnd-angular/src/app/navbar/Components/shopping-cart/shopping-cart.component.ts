import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { cartService } from '../../../Services/cartService.service';

@Component({
  selector: 'shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit {

  @Output() closeCartEvent = new EventEmitter<void>(); // Event to notify parent
   route:Router = inject(Router) 
   productService = inject(ProductService)
   cartService = inject(cartService)

   ngOnInit(){
 
     //this.getProductCartsAddedByUserFromLocalStorage()
     this.cartService.copyProductsCartsFromLocalStorageToCartItems()
     this.cartService.loadProductImagesOfCartItemsFromDbByThierIDS()
   }
 

   
  closeCart(): void {
    this.closeCartEvent.emit(); // Emit event when closeCart is called
  }
  
  // Function to calculate the subtotal
  getSubtotal(): number {
    return this.cartService.cartItems.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  }


 goToCheckoutPage() {
  
  const userToken = localStorage.getItem('userToken');  // Check if the user token exists
  this.closeCart();

  if(!this.cartService.cartItems.length) return

  if (userToken) {
    // If the user is logged in, navigate to the Checkout page
    this.route.navigate(['/Checkout']);
    
  } else {
    // If the user is not logged in, store the target URL (checkout page)
    localStorage.setItem('UrlToRedirect', '/Checkout');
    // Redirect to the login page to authenticate the user
    this.route.navigate(['/Login']);
  }
}

}
