import { Component, inject, Input } from '@angular/core';
import {ProductDTO} from '../../Dtos/product.dto';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ImageLoaderComponent } from "../image-loader/image-loader.component";
import { CommonModule, ViewportScroller } from '@angular/common';
import { getProductDTO } from '../../Dtos/getProduct.dto';
import { displayProductDTO } from '../../Dtos/displayProduct.dto';
import { FormsModule } from '@angular/forms';
import { cartService } from '../../Services/cartService.service';
import { productToBuy } from '../../Dtos/productToBuy.dto';

@Component({
  selector: 'product',
  imports: [ImageLoaderComponent,RouterOutlet, RouterLink, RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

   @Input() product!: displayProductDTO 
   cartService = inject(cartService)

   constructor(private route:Router,private viewportScroller: ViewportScroller) {
    
   }

   goToProductPage(productClickedID:number){

    this.route.navigate(['/Products/Product/', productClickedID])
    .then(() => this.viewportScroller.scrollToPosition([0, 0]));
    
   }

   addToCart(productClicked:displayProductDTO){
    
    const productToAddToCart : productToBuy =  
             new productToBuy(productClicked.name,productClicked.id,1,productClicked.price)
     
    this.cartService.addProductToCart(productToAddToCart)

   }
}
