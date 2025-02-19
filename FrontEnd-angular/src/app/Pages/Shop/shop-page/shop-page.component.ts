import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ShopHeroComponent } from "../../../SharedComponents/shop-hero/shop-hero.component";
import { ShowingProductsParamsComponent } from '../Components/showing-products-params/showing-products-params.component';
import { ProductListComponent } from "../../../SharedComponents/product-list/product-list.component";
import { ProductService } from '../../../Services/product.service';
import { ServiceAndWarrantyComponent } from "../../../SharedComponents/service-and-warranty/service-and-warranty.component";
import { PaginationComponent } from "../../../SharedComponents/pagination/pagination.component";
import { ProductDTO } from '../../../Dtos/product.dto';

@Component({
  selector: 'shop-page',
  imports: [ShopHeroComponent, ShowingProductsParamsComponent, ProductListComponent,
    ServiceAndWarrantyComponent, PaginationComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent implements OnInit  {
  
  constructor(private productService:ProductService){ }
  
  // these are the total products loaded
   products!: {
        id: number;
        name: string;
        description: string;
        price: number;
        oldPrice: number;
        category: string;
        stock: number;
        rating: number;
        imageUrl: string;
      }[] ;
         
  // these are the products we're going to display per page
   productsToDisplay!: ProductDTO[] ;

  ngOnInit(): void {

    this.loadAllProducts()
    this.whenBtnPageIsClickedSubscription()
  }
  
  // we subscribe to event that is raised when the page btn is clicked
  whenBtnPageIsClickedSubscription(){
      this.productService.productsSentFromPaginationEvent.
      subscribe(_ => {  this.updateProductToDisplayWhenBtnPageIsClicked() })
  }

  loadAllProducts(){
    this.products = this.productService.products;
  }
   
  updateProductToDisplayWhenBtnPageIsClicked(){
     this.productsToDisplay = this.productService.productsToLoadAtShopPage
  }

}
