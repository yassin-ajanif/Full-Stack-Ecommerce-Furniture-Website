import { Component, Input } from '@angular/core';
import {ProductDTO} from '../../Dtos/product.dto';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

   @Input() product!: ProductDTO 
   

   constructor(private activatedRoute:ActivatedRoute,private route:Router) {
    
   }

   goToProductPage(productClickedID:number){

    this.route.navigate(['/Products/Product/', productClickedID]);
    
   }
}
