import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'products-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './products-cart.component.html',
  styleUrl: './products-cart.component.css'
})
export class ProductsCartComponent {

  cartItems = [
    { id: 1, name: 'Product 1', image: 'Assets/Shared/image 1.png', price: 25, quantity: 1 },
    { id: 2, name: 'Product 2', image: 'Assets/Shared/image 2.png', price: 40, quantity: 1 }
  ];

  updateSubtotal(item: any): number {
    return item.quantity * item.price;
  }

  removeProduct(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }
}
