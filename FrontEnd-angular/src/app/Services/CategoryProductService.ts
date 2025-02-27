// product-category.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, Subject, throwError } from 'rxjs';
import { ProductCategoryDTO } from '../Dtos/productCategory.dto'; // Import the DTO model
import { SpinnerService } from './spinner-service.service';
import { overLayService } from './overLayService.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryProductService {
  
  http:HttpClient = inject(HttpClient)

  private baseUrl = 'https://localhost:7023/api/CategoryProducts/';  

  categories: ProductCategoryDTO[] = [];
  categoryNames : string[] = []
  spinnerService = inject(SpinnerService)
  overlayMessageBoxService = inject(overLayService)

  categoryNamesSubject = new Subject<ProductCategoryDTO[]>();

  loadProductCategories(): Observable<ProductCategoryDTO[]> {
    return this.http.get<ProductCategoryDTO[]>(this.baseUrl + "all").pipe(
      map(categories => {
        this.categories = categories; // Store locally if needed
        this.categoryNamesSubject.next(categories); // Update BehaviorSubject
        return categories; // `map()` ensures the data is returned
      }),
      catchError(error => {
        console.error('Error fetching product categories:', error);
        return of([]);
      })
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
  
  AddProductCategory(productCategory: ProductCategoryDTO): Observable<boolean> {
    this.spinnerService.showSpinner();
  
    return this.http.post(`${this.baseUrl}add`, productCategory).pipe(
      map(() => {
        this.spinnerService.hideSpinner();
        this.overlayMessageBoxService.showOverLay_Without_ConfirmationMode("Category added successfully");
        return true;
      }),
      catchError(() => {
        this.spinnerService.hideSpinner();
        this.overlayMessageBoxService.showOverLay_Without_ConfirmationMode("Something went wrong");
        return of(false);
      })
    );
  }
  
  UpdateProductCategory(productCategory: ProductCategoryDTO): Observable<boolean> {
    this.spinnerService.showSpinner();
  
    return this.http.put(`${this.baseUrl}update`, productCategory).pipe(
      map(() => {
        this.spinnerService.hideSpinner();
        this.overlayMessageBoxService.showOverLay_Without_ConfirmationMode("Category updated successfully");
        return true;
      }),
      catchError(() => {
        this.spinnerService.hideSpinner();
        this.overlayMessageBoxService.showOverLay_Without_ConfirmationMode("Something went wrong");
        return of(false);
      })
    );
  }
  

  DeleteProductCategoryByID(productCategoryId: number): Observable<boolean> {
  this.spinnerService.showSpinner();

  return this.http.delete(`${this.baseUrl}delete/${productCategoryId}`).pipe(
    map(() => {
      this.spinnerService.hideSpinner();
      this.overlayMessageBoxService.showOverLay_Without_ConfirmationMode("Category deleted successfully");
      return true;
    }),
    catchError(() => {
      this.spinnerService.hideSpinner();
      this.overlayMessageBoxService.showOverLay_Without_ConfirmationMode("Something went wrong");
      return of(false);
    })
  );
}

}
