import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../../Services/product.service';

@Component({
  selector: 'products-cart',
  imports: [CommonModule,FormsModule],
  templateUrl: './products-cart.component.html',
  styleUrl: './products-cart.component.css'
})
export class ProductsCartComponent implements OnInit {

  cartItems: { id: number, name: string, image: string, price: number, quantity: number }[] = [];
  productService = inject(ProductService)

  ngOnInit(){

  }

 
  

  updateSubtotal(item: any): number {
    return item.quantity * item.price;
  }

  removeProduct(itemId: number): void {
    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
  }

 
    
     
  
}
