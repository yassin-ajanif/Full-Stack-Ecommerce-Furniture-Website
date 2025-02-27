import { Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { ProductDTO } from '../../Dtos/product.dto';
import { getProductDTO } from '../../Dtos/getProduct.dto';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';
import { firstValueFrom, forkJoin, Observable, of, Subscription, throwError } from 'rxjs';
import { displayProductDTO } from '../../Dtos/displayProduct.dto';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { ProductCategoryDTO } from '../../Dtos/productCategory.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-list',
  imports: [ProductComponent,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnChanges ,OnDestroy{
  
  
   @Input() products: displayProductDTO[] =[];
   @Input() startIndex : number = 0
   @Input() endIndex : number = 0
   productService  = inject(ProductService)
   categoryService = inject(CategoryProductService)
   activatedRoute = inject(ActivatedRoute)
   private productsWithImagesIncludedSubsription! : Subscription 
 
  
   ngOnChanges(): void {
    
      this.loadProductsWithoutImages()
      
      this.productsWithImagesIncludedSubsription = this.loadImagesOfTheseProducts().
      subscribe(updatedProductsIncludingImages => {
        this.products = updatedProductsIncludingImages;
      });
                  
  }
   
  

  loadProductsWithoutImages() {
  // this function is going to show the product for each page
    // for example if we have page 1 the startindex = 0 and endindex = 
    // products we set to display per page
    // if we set the productsNumber to display per page to 8 
    // we will have startindex =0 and endindex = 8 
    // page 2 will be startindex = 8 and endindex = 16 and so on
    const firstPageProducts = this.productService.productsToLoadAtShopPage.slice(this.startIndex,this.endIndex)
    
    this.products = firstPageProducts

  }
  
  loadImagesOfTheseProducts(): Observable<displayProductDTO[]> {
  return this.productService.loadImagesOfTheseProducts(this.products);
}


 ngOnDestroy(): void {

  
    if(this.productsWithImagesIncludedSubsription)this.productsWithImagesIncludedSubsription.unsubscribe()
   
    
    }

}
