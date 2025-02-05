import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ServiceAndWarrantyComponent } from '../../../SharedComponents/service-and-warranty/service-and-warranty.component';
import { ProductsCartComponent } from '../Components/products-cart/products-cart.component';

@Component({
  selector: 'cart',
  imports: [CommonModule,ServiceAndWarrantyComponent,ProductsCartComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

}
