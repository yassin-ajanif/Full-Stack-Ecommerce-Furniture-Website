// product-category.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ProductCategoryDTO } from '../Dtos/productCategory.dto'; // Import the DTO model

@Injectable({
  providedIn: 'root',
})
export class CategoryProductService {
  
  http:HttpClient = inject(HttpClient)

  private getCategoryProductUrl = 
  'https://localhost:7023/api/CategoryProducts/ProductsCategories'; // Replace with your actual API URL

  categories: ProductCategoryDTO[] = [];
  categoryNames : string[] = []
  categoryNamesSubject = new Subject<string[]>();

  getProductCategories(httpClient:HttpClient): Observable<ProductCategoryDTO[]> {

    return httpClient.get<ProductCategoryDTO[]>(this.getCategoryProductUrl);

  }

  loadProductCategoryAsyn_At_Component(componenet:any){

    this.categoryNamesSubject.subscribe(data=>{
  
      componenet.categoryNamesToPickByUser = data
   })}

   send_To_AllSubsribedCompnts_CategoryNames(categories:string[]){
    
    this.categoryNamesSubject.next(categories)

   }

   loadProductCategoriesAsync(): void {

    this.getProductCategories(this.http).subscribe(
      (data) => {
        
        this.categories = data; // Store the full category data
        this.categoryNames = data.map((category) => category.name); // Extract only names for display 
        
        this.send_To_AllSubsribedCompnts_CategoryNames(this.categoryNames)
        
      },
      (error) => {
        console.log('Error retrieving categories: ' + error.message);
      }
    );
  }

  getCategoryIdOfProductFromItName(categoryName: string): number|undefined {
    const category = this.categories.find(cat => cat.name === categoryName);
    
    if (!category) {
      return undefined;
    }
  
    return category.id;
  }

  getCategoryNameFromId(categoryId: number): string|undefined {
    const category = this.categories.find(cat => cat.id === categoryId);
  
    if (!category) {
      return undefined;
    }
  
    return category.name;
  }
  

}
