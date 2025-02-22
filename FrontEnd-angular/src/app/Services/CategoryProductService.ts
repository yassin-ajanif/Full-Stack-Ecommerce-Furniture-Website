// product-category.service.ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { ProductCategoryDTO } from '../Dtos/productCategory.dto'; // Import the DTO model

@Injectable({
  providedIn: 'root',
})
export class CategoryProductService {
  
  http:HttpClient = inject(HttpClient)

  private baseUrl = 'https://localhost:7023/api/CategoryProducts/';  

  categories: ProductCategoryDTO[] = [];
  categoryNames : string[] = []

  categoryNamesSubject = new Subject<ProductCategoryDTO[]>();

  loadProductCategories(): void {

    this.http.get<ProductCategoryDTO[]>(this.baseUrl + "all").subscribe(
      (categories) => {
        this.categories = categories
        this.categoryNamesSubject.next(categories);
      },
      (error) => {
        console.error('Error fetching product categories:', error);
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
  
  AddProductCategory(productCategory: ProductCategoryDTO): Observable<boolean> {
    return this.http.post(`${this.baseUrl}add`, productCategory).pipe(
      map(() => true), 
      catchError(() => of(false)) 
    );
  }
  
  UpdateProductCategory(productCategory: ProductCategoryDTO): Observable<boolean> {

    return this.http.put(`${this.baseUrl}update`, productCategory).pipe(
      map(() => true), 
      catchError(() => of(false)) 
    );
  }

  DeleteProductCategoryByID(productCategoryId: number): Observable<boolean> {

    return this.http.delete(`${this.baseUrl}delete/${productCategoryId}`).pipe(
      map(() => true), 
      catchError(() => of(false)) 
    );
  }
}
