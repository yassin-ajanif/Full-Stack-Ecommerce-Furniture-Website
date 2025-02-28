import { AfterViewInit, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ShopHeroComponent } from "../../../SharedComponents/shop-hero/shop-hero.component";
import { ShowingProductsParamsComponent } from '../Components/showing-products-params/showing-products-params.component';
import { ProductListComponent } from "../../../SharedComponents/product-list/product-list.component";
import { ProductService } from '../../../Services/product.service';
import { ServiceAndWarrantyComponent } from "../../../SharedComponents/service-and-warranty/service-and-warranty.component";
import { PaginationComponent } from "../../../SharedComponents/pagination/pagination.component";
import { ProductDTO } from '../../../Dtos/product.dto';
import { ImageLoaderComponent } from "../../../SharedComponents/image-loader/image-loader.component";
import { getProductDTO } from '../../../Dtos/getProduct.dto';
import { displayProductDTO } from '../../../Dtos/displayProduct.dto';
import { CategoryProductService } from '../../../Services/CategoryProductService';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'shop-page',
  imports: [ShopHeroComponent, ShowingProductsParamsComponent, ProductListComponent,
    ServiceAndWarrantyComponent, PaginationComponent, ImageLoaderComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent implements OnInit ,OnDestroy ,AfterViewInit{
  
  ngAfterViewInit(): void {
    
     this.endIndexProductPage = 8
  }
  
  private queryParamsSubscription!: Subscription;
  private searchSubscription!: Subscription;

  productService = inject(ProductService)
  categoryProductService = inject(CategoryProductService)
  activatedRoute = inject(ActivatedRoute)
     
  // these are the products we're going to display per page
   productsToDisplay: displayProductDTO[] = [];
   startIndexProductPage : number = 0
   endIndexProductPage : number = 0

   productAndCategoryDescription! : Subscription
   
  ngOnInit(): void {

    
    this.loadProducts()

  }


  ngOnDestroy(): void {

    this.productAndCategoryDescription.unsubscribe()

    if (this.queryParamsSubscription)  this.queryParamsSubscription.unsubscribe();
   
    if (this.searchSubscription) this.searchSubscription.unsubscribe();
  }
  
  // we load all the proudcts from servers at once from one request
  // the same thing for categories
  // this analogy is used because we want to save the request numbers to server
  // since the products numbers are not huge
  // then we map categories with product since products are returned by category id
  // we use forkjoin to wait for all the both product and category requests to finish
  // so the mapping operation success in this way the code is going to be less verbose
  loadAllProductsWithCategories(): Observable<displayProductDTO[]> {
  
    return forkJoin({
    products: this.productService.loadAllProducts(),
    categories: this.categoryProductService.loadProductCategories(),
  }).pipe(
    map(({ products, categories }) =>
      products.map(product => {
        // Find category name by matching categoryID
        const category = categories.find(c => c.id === product.categoryID);
        return new displayProductDTO(
          product.id,
          product.name,
          product.description,
          product.stockQuantity,
          product.price,
          category ? category.name : "Unknown Category", // Use category name or fallback
          product.imageUrl
        );
      })
    )
  );
}

  
  OnproductPageIndexesChanges(ProductPageIndexes:{ startIndex: number, endIndex: number }){

    this.startIndexProductPage = ProductPageIndexes.startIndex
    this.endIndexProductPage = ProductPageIndexes.endIndex

  }

  //loadProducts
  
  clearProductsToDisplay(){
    this.productsToDisplay.length = 0
  }

  
  loadProducts(): void {

  this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
    
    const searchTerm = params['search'];
    // when the search prefix is displayed in the route it means user is searching for products
    // so the search keywork prefix is existing
    const userIsSearchingForProducts = searchTerm
    // when user want to load the shop page it dosent look for a specific product
    const userIsLoadingTheShopPage =  (searchTerm === undefined)
 

    if (userIsSearchingForProducts) this.loadProductsBySearchTerm(searchTerm)
   
    else if(userIsLoadingTheShopPage)  this.loadAllProducts()
    
  });

  }

 private convertToDisplayProductDTO(product: getProductDTO): displayProductDTO {
  return new displayProductDTO(
    product.id,
    product.name,
    product.description, // Default value for description
    product.stockQuantity,    // Default value for stockQuantity (replace with actual value if available)
    product.price,
    this.categoryProductService.getCategoryNameFromId(product.categoryID) ?? 'unkown category',   // Default value for categoryName (replace with actual value if available)
    product.imageUrl ?? null // Ensure imageUrl is handled correctly
  );
 }

 private loadProductsBySearchTerm(searchTerm:string){

  this.searchSubscription = this.productService.searchProductsByPrefixNameAsync(searchTerm).pipe(
    map((products: getProductDTO[]) => 
      products.map(product => this.convertToDisplayProductDTO(product)) // Transform each item
    )
  ).subscribe((displayProducts: displayProductDTO[]) => {
    
    // load product service class with actual value of products to display
    this.productService.productsToLoadAtShopPage = displayProducts
    // display the products in the container
    this.clearProductsToDisplay()
    this.productsToDisplay = displayProducts;  // Assign transformed data
  });
 }

 private loadAllProducts(){

  this.productAndCategoryDescription=this.loadAllProductsWithCategories().
    subscribe(transformedProducts => {
      
      this.clearProductsToDisplay()
      this.productsToDisplay = transformedProducts;
      // we load all the products with their categorynames in the product service 
      // so others componenets implements the product service can use them
      this.productService.productsToLoadAtShopPage = transformedProducts;
    });
 }

}
