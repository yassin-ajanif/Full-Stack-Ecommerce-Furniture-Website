import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductListComponent } from "../../../../SharedComponents/product-list/product-list.component";
import { ProductService } from '../../../../Services/product.service';
import { ProductDTO } from '../../../../Dtos/product.dto';
import { getProductDTO } from '../../../../Dtos/getProduct.dto';
import { displayProductDTO } from '../../../../Dtos/displayProduct.dto';
import { map, Subscription, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'related-products',
  imports: [ProductListComponent],
  templateUrl: './related-products.component.html',
  styleUrl: './related-products.component.css'
})
export class RelatedProductsComponent implements OnDestroy , OnInit{
  
  realtedProducts : displayProductDTO[] = []
  relatedProductsSub! : Subscription
  relatedProductsImageSub! : Subscription
  productService = inject(ProductService);
  router = inject(Router)

  ngOnInit(): void {
    this.loadRelatedProducts();
  }
  
  loadRelatedProducts() {
    this.relatedProductsSub = this.productService.loadAllProducts()
      .pipe(
        map((productsDtos: getProductDTO[]) =>
          productsDtos.map(product =>
            new displayProductDTO(
              product.id,
              product.name,
              product.description,
              product.stockQuantity,
              product.price,
              "",
              product.imageUrl
            )
          )
        ),
        map((displayProducts: displayProductDTO[]) => {
          this.realtedProducts = displayProducts.slice(0, 4);
          return this.realtedProducts;
        }),
        switchMap((products: displayProductDTO[]) =>
          this.productService.loadImagesOfTheseProducts(products)
        )
      )
      .subscribe(
        (productsLoadedWithImages: displayProductDTO[]) => {
          this.realtedProducts = productsLoadedWithImages;
        },
        error => {
          console.error('Error loading products or images:', error);
        }
      );
  }
  

  ShowMore(){
    this.router.navigate(['Shop'])
  }

ngOnDestroy(): void {
  
  if(this.relatedProductsSub) this.relatedProductsSub.unsubscribe()
  if(this.relatedProductsImageSub) this.relatedProductsImageSub.unsubscribe()
}
}