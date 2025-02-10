import { Component, Input } from '@angular/core';
import {Product} from '../../Dtos/product.dto';

@Component({
  selector: 'product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

   @Input() product!: Product 

   
}
