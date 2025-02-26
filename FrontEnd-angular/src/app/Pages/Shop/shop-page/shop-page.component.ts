import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShopHeroComponent } from "../../../SharedComponents/shop-hero/shop-hero.component";
import { ShowingProductsParamsComponent } from '../Components/showing-products-params/showing-products-params.component';
import { ProductListComponent } from "../../../SharedComponents/product-list/product-list.component";
import { ProductService } from '../../../Services/product.service';
import { ServiceAndWarrantyComponent } from "../../../SharedComponents/service-and-warranty/service-and-warranty.component";
import { PaginationComponent } from "../../../SharedComponents/pagination/pagination.component";
import { ProductDTO } from '../../../Dtos/product.dto';
import { ImageLoaderComponent } from "../../../SharedComponents/image-loader/image-loader.component";
import { getProductDTO } from '../../../Dtos/getProduct.dto';

@Component({
  selector: 'shop-page',
  imports: [ShopHeroComponent, ShowingProductsParamsComponent, ProductListComponent,
    ServiceAndWarrantyComponent, PaginationComponent, ImageLoaderComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent implements OnInit  {
  
  constructor(private productService:ProductService){ }
        
  // these are the products we're going to display per page
   productsToDisplay: getProductDTO[] = [];
   startIndexProductPage : number = 0
   endIndexProductPage : number = 0
   
  ngOnInit(): void {

   this.productService.loadAllProducts().subscribe
   (products=> 
    this.productsToDisplay = this.productService.productsToLoadAtShopPage =products)
     
  }
  
  OnproductPageIndexesChanges(ProductPageIndexes:{ startIndex: number, endIndex: number }){

    this.startIndexProductPage = ProductPageIndexes.startIndex
    this.endIndexProductPage = ProductPageIndexes.endIndex
  }
  



}
