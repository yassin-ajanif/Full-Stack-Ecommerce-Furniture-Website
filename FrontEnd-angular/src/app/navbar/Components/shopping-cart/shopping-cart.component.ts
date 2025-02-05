import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent {

  @Output() closeCartEvent = new EventEmitter<void>(); // Event to notify parent

  
  closeCart(): void {
    this.closeCartEvent.emit(); // Emit event when closeCart is called
  }

  cartItems: { image: string, name: string, price: number, quantity: number }[] = [
    {
      image: 'Assets/Shared/image 1.png',
      name: 'Product 1',
      price: 20.0,
      quantity: 2
    },
    {
      image: 'Assets/Shared/image 1.png',
      name: 'Product 2',
      price: 10.0,
      quantity: 1
    }
  ];

  // Function to calculate the subtotal
  getSubtotal(): number {
    return this.cartItems.reduce((subtotal, item) => {
      return subtotal + item.price * item.quantity;
    }, 0);
  }

  // Function to remove a product from the cart
  removeProduct(productToRemove: { image: string, name: string, price: number, quantity: number }) {
    const index = this.cartItems.indexOf(productToRemove);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  
  
}
