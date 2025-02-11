import { Component, Input } from '@angular/core';
import {Product} from '../../Dtos/product.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

   @Input() product!: Product 
   

   constructor(private activatedRoute:ActivatedRoute,private route:Router) {
    
   }

   goToProductPage(productClickedID:number){

    this.route.navigate(['/Products/Product/', productClickedID]);
    
   }
}
