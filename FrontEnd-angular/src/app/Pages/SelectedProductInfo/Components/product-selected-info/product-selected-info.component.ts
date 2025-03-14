import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit,inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../../../Services/product.service';
import { Subscription } from 'rxjs';
import { cartService } from '../../../../Services/cartService.service';
import { productToBuy } from '../../../../Dtos/productToBuy.dto';

@Component({
  selector: 'product-selected-info',
  imports: [FormsModule],
  templateUrl: './product-selected-info.component.html',
  styleUrl: './product-selected-info.component.css'
})
export class ProductSelectedInfoComponent implements OnInit , OnDestroy {

  quantity: number = 1;
  maxQuantity : number = 10
  productImageUrl: string | null = null;
  
  productToAddToCart! : productToBuy 

  productSub!:Subscription
  productImageSub!:Subscription
  cartService = inject(cartService)

  constructor(private http: HttpClient,private activatedRoute:ActivatedRoute,private productService:ProductService) {}
  

  ngOnInit(): void {
    
    this.activatedRoute.paramMap.subscribe(paramMap => {

     const productId : number = Number(paramMap.get('id') )

     if(!productId) return

     this.getProductClickedByIdRoute(productId)
     
     this.getProductImageById(productId)

    });

  }

 getProductClickedByIdRoute(productId:number) {

  this.productSub = this.productService.searchProductById(productId).subscribe(product=>{
    
    // this is default value because the user havent picked the quanity to buy yet 
    // were here in the phase or retriving product clicked to decide if we add it to cart or not
    // so we set it value to ZERO 
    const quantityOfProductToBuy = 0
    this.productToAddToCart = new productToBuy(product.name,product.id,0,product.price)
   
 })

}

getProductImageById(productId:number) {

 this.productImageSub= this.productService.getProductImageById(productId).subscribe((imageBlob)=>{

  this.productImageUrl = URL.createObjectURL(imageBlob);
 })

}



  decrease() {
   
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increase() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  OnAddToCart(productAddedToCart:productToBuy){
    
    productAddedToCart.quantity = this.quantity

   this.cartService.addProductToCart(productAddedToCart)
      
  }


ngOnDestroy(): void {

  if(this.productImageSub) this.productImageSub.unsubscribe()

  if(this.productSub) this.productSub.unsubscribe()
}

}