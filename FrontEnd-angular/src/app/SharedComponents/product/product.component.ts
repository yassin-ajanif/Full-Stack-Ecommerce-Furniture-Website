import { Component, Input } from '@angular/core';
import {ProductDTO} from '../../Dtos/product.dto';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageLoaderComponent } from "../image-loader/image-loader.component";
import { CommonModule } from '@angular/common';
import { getProductDTO } from '../../Dtos/getProduct.dto';
import { displayProductDTO } from '../../Dtos/displayProduct.dto';

@Component({
  selector: 'product',
  imports: [ImageLoaderComponent,CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

   @Input() product!: displayProductDTO 
   

   constructor(private activatedRoute:ActivatedRoute,private route:Router) {
    
   }

   goToProductPage(productClickedID:number){

    this.route.navigate(['/Products/Product/', productClickedID]);
    
   }
}
