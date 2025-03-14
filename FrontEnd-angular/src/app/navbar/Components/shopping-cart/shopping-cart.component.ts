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

   cartItems: { id: number, name: string, image: string, price: number, quantity: number }[] = [];

   ngOnInit(){
 
     this.getProductCartsAddedByUserFromLocalStorage()
     this.loadProductImages()
   }
 
   getProductCartsAddedByUserFromLocalStorage(){
 
 // Retrieve cart data from localStorage
    const storedCart = localStorage.getItem('cart');
 
    if (storedCart) {
     // If cart exists in localStorage, parse and assign to cartItems
     this.cartItems = JSON.parse(storedCart);
    }
 
   }


  loadProductImages(): void {
        this.cartItems.forEach(item => {
          // Assuming getProductImageById returns a Blob or URL of the image
          this.productService.getProductImageById(item.id).subscribe(
            imageBlob => {          
              
                const imageUrl = URL.createObjectURL(imageBlob);
                item.image = imageUrl; // Set the image URL to the item
              
            }
          );
        });
      }


  closeCart(): void {
    this.closeCartEvent.emit(); // Emit event when closeCart is called
  }
  // Function to calculate the subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  }

  // Function to remove a product from the cart
  removeProduct(productToRemoveID: number) {

    this.cartItems = this.cartService.removeProductAndGetUpdatedList(productToRemoveID,this.cartItems)
 }


  goToCheckoutPage(){
 
    this.route.navigate(['/Checkout'])
    
  }
}
