import { Component, ElementRef, inject, Inject, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DropdownComponent } from '../../../../SharedComponents/dropdown/dropdown.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { routes } from '../../../../app.routes';
import { ProductCategoryDTO } from '../../../../Dtos/productCategory.dto';
import { CategoryProductService } from '../../../../Services/CategoryProductService';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'showing-products-params',
  imports: [DropdownComponent,RouterLink],
  templateUrl: './showing-products-params.component.html',
  styleUrl: './showing-products-params.component.css'
})
export class ShowingProductsParamsComponent implements OnInit,OnDestroy{

  @ViewChild('searchInput') searchInput!: ElementRef;

  searchedProduct: string | null = null;
  activatedRoute : ActivatedRoute = inject(ActivatedRoute)
  router : Router = inject(Router)
  categoryProductService = inject(CategoryProductService)
  renderer = inject(Renderer2)

  productCategories : ProductCategoryDTO[] = []
  productCategoryNames : string [] = []
  productCategorySubsription! : Subscription ;
  selectedCategoryName : string = 'All'

  ngOnInit(): void {

  //this.searchedProduct = this.activatedRoute.snapshot.queryParams['search'];
  
  // when the product categories are loaded display them 
  this.productCategorySubsription = 
  this.getCategoryNames().subscribe(categoryNames => {this.productCategoryNames = categoryNames; });

  }

  ngOnDestroy(): void {
    
    if (this.productCategorySubsription) this.productCategorySubsription.unsubscribe();
    
  }

  private getCategoryNames(): Observable<string[]> {
    return this.categoryProductService.categoryNamesSubject.pipe(
      map(categoryProducts => ["All", ...categoryProducts.map(c => c.name )]) // Add "All" at the beginning
    );
  }
  
  clearSearch() {
    this.renderer.setProperty(this.searchInput.nativeElement, 'value', ''); // Reset input value
  }

  getSelectedCategoryName_From_DropDownMenu(categoryName : string){

    this.selectedCategoryName = categoryName
    
    this.clearSearch()
    
    this.router.navigate(['/Shop'], { 
      queryParams: { 
          category: this.selectedCategoryName // Adds a single category
      } 
  });
  }

  searchProduct(searchTerm: string) {
      
    this.router.navigate(['/Shop'], { 
        queryParams: { 
            search: searchTerm, 
            category: this.selectedCategoryName // Adds a single category
        } 
    });
}

   
  
}
