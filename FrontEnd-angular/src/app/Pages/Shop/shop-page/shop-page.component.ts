import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { productUtilities } from '../../../Utilities/productUtilities';

@Component({
  selector: 'shop-page',
  imports: [ShopHeroComponent, ShowingProductsParamsComponent, ProductListComponent,
  ServiceAndWarrantyComponent, PaginationComponent, ImageLoaderComponent,CommonModule],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css',
  
})
export class ShopPageComponent implements OnInit ,OnDestroy {
  
  private queryParamsSubscription!: Subscription;
  private searchSubscription!: Subscription;
  private productDisplayedImagesSubscription! : Subscription;

  productService = inject(ProductService)
  categoryProductService = inject(CategoryProductService)
  activatedRoute = inject(ActivatedRoute)
     
  // these are the products we're going to display per page
   ProductsRetrievedFromDb: displayProductDTO[] = [];
   productsToDisplay      : displayProductDTO[]=[]
   startIndexProductPage : number = 0
   endIndexProductPage : number = 0
   isFetching! : boolean 
   errorDetected! : boolean

   productAndCategoryDescription! : Subscription
   
  ngOnInit(): void {

    
    this.loadSearchedProducts()

  }

  
  ngOnDestroy(): void {

    this.productAndCategoryDescription.unsubscribe()

    if (this.queryParamsSubscription)  this.queryParamsSubscription.unsubscribe();
   
    if (this.searchSubscription) this.searchSubscription.unsubscribe();

    if(this.productDisplayedImagesSubscription) this.productDisplayedImagesSubscription.unsubscribe()
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

  
  // the startindex and endindex are the indexes of array product we should use
  // which indicating the page we want to display
  loadActualProductPage(ProductPageIndexes:{ startIndex: number, endIndex: number }){

    this.startIndexProductPage = ProductPageIndexes.startIndex
    this.endIndexProductPage = ProductPageIndexes.endIndex
      
    // we waint the change detection cycle to end up for this componenet
    // so when the productToDispaly variable change we can trigger the change detection
    //cylce to get triggered
    // ng onchanges can be triggered twice on the same change detection cylce
    // look for further solution of this issue

    setTimeout(() => {
      
      this.loadProductsToDisplay_AfterWard_TheirImages()

    }, 0);
    
     
  }

  
  loadProductsToDisplayWithoutImages() {
    
    // this function is going to show the product for each page
    // for example if we have page 1 the startindex = 0 and endindex = 
    // products we set to display per page
    // if we set the productsNumber to display per page to 8 
    // we will have startindex =0 and endindex = 8 
    // page 2 will be startindex = 8 and endindex = 16 and so on
    
    this.productsToDisplay = 
    this.ProductsRetrievedFromDb.slice(this.startIndexProductPage,this.endIndexProductPage)

  }

  load_LoadedProductsDisplayed_Images(): Observable<displayProductDTO[]> {
    return this.productService.loadImagesOfTheseProducts(this.productsToDisplay);
  }

  loadProductsToDisplay_AfterWard_TheirImages(){
     
    this.loadProductsToDisplayWithoutImages()

    this.productDisplayedImagesSubscription = this.load_LoadedProductsDisplayed_Images().subscribe(updatedProductsIncludingImages => {
      this.productsToDisplay = updatedProductsIncludingImages;
    });

  }
 
  
  loadSearchedProducts(): void {

  this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(params => {
    
    let searchTerm = params['search'];
    const category = params['category']
    // when the search prefix is displayed in the route it means user is searching for products
    // so the search keywork prefix is existing,
    
    const userIsSearchingForProducts = searchTerm 
    // when user want to load the shop page it dosent look for a specific product
    const userIsLoadingTheShopPage =  (searchTerm === undefined)
    const userIsSearchingForProductsPerCategories = (searchTerm===undefined) && category

    if (userIsSearchingForProducts) this.loadProductsBySearchTerm(searchTerm,category)
   
    else if(userIsSearchingForProductsPerCategories) this.loadProductsByCategories(category)
    
    else if(userIsLoadingTheShopPage)  this.loadAllProducts()

  });

  }


 private loadProductsBySearchTerm(searchTerm: string,category:string) {
  this.isFetching = true;   // Start fetching
  this.errorDetected = false;  // Reset error state

  this.searchSubscription = this.productService.searchProductsByPrefixNameAsync(searchTerm,category).pipe(
    map((products: getProductDTO[]) => 
      products.map(product => productUtilities.convertToDisplayProductDTO(product,this.categoryProductService))
    )
  ).subscribe({
    next: (displayProducts: displayProductDTO[]) => {
          
       this.ProductsRetrievedFromDb = displayProducts; // Step 3: Assign the new products
       this.isFetching = false; // Stop fetching
    },
    error: (error) => {
      this.ProductsRetrievedFromDb = []
      this.errorDetected = true;
      this.isFetching = false;
    },
    complete: () => {
      this.isFetching = false;
    }
  });
}

private loadProductsByCategories(category:string) {
  this.isFetching = true;   // Start fetching
  this.errorDetected = false;  // Reset error state

  this.searchSubscription = this.productService.searchProductsByCategories(category).pipe(
    map((products: getProductDTO[]) => 
      products.map(product => productUtilities.convertToDisplayProductDTO(product,this.categoryProductService))
    )
  ).subscribe({
    next: (displayProducts: displayProductDTO[]) => {
          
       this.ProductsRetrievedFromDb = displayProducts; // Step 3: Assign the new products
       this.isFetching = false; // Stop fetching
    },
    error: (error) => {
      this.ProductsRetrievedFromDb = []
      this.errorDetected = true;
      this.isFetching = false;
    },
    complete: () => {
      this.isFetching = false;
    }
  });
}

private loadAllProducts() {

  this.isFetching = true;   // Start fetching
  this.errorDetected = false; 

  this.productAndCategoryDescription = this.loadAllProductsWithCategories()
    .subscribe({
      next: (transformedProducts) => {
        // when the value of proudctsRetrievedFromDb changes is going to trigger a pagination
      //event that calls loadActualProductPage() method with new index pages
        this.ProductsRetrievedFromDb = transformedProducts;
        this.isFetching = false; // Stop loading
      },
      error: (error) => {
      this.ProductsRetrievedFromDb = []
      this.errorDetected = true;
      this.isFetching = false;
      },
      complete: () => {
        this.isFetching = false;
      }
    });
}


}
