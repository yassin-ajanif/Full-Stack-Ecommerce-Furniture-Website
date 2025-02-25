import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { ProductDTO } from '../../Dtos/product.dto';

@Component({
  selector: 'product-list',
  imports: [ProductComponent,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnChanges{
  
   
   @Input() products: ProductDTO[] =[];
   @Input() startIndex : number = 0
   @Input() endIndex : number = 0
   productService  = inject(ProductService)
   
   
   ngOnChanges(): void {
    
    // this function is going to show the product for each page
    // for example if we have page 1 the startindex = 0 and endindex = 
    // products we set to display per page
    // if we set the productsNumber to display per page to 8 
    // we will have startindex =0 and endindex = 8 
    // page 2 will be startindex = 8 and endindex = 16 and so on
       this.products = this.productService.productsToLoadAtShopPage.
       slice(this.startIndex,this.endIndex)
  }

   
   
}
