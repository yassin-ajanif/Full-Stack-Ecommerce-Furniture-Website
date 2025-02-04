import { Component } from '@angular/core';
import { ProductListComponent } from "../../../../SharedComponents/product-list/product-list.component";
import { ProductService } from '../../../../Services/product.service';

@Component({
  selector: 'related-products',
  imports: [ProductListComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  
  realtedProducts! : any

   constructor(private productService:ProductService){

    this.realtedProducts = this.productService.products.slice(0,4)
   }

   
}
