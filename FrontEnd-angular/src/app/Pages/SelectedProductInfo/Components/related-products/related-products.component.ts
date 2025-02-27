import { Component } from '@angular/core';
import { ProductListComponent } from "../../../../SharedComponents/product-list/product-list.component";
import { ProductService } from '../../../../Services/product.service';
import { ProductDTO } from '../../../../Dtos/product.dto';
import { getProductDTO } from '../../../../Dtos/getProduct.dto';
import { displayProductDTO } from '../../../../Dtos/displayProduct.dto';

@Component({
  selector: 'related-products',
  imports: [ProductListComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent {
  
  realtedProducts : displayProductDTO[] = []

   constructor(private productService:ProductService){

   
   }

   
}
