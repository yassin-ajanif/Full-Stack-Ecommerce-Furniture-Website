// product-category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductCategoryDTO } from '../Dtos/productCategory.dto'; // Import the DTO model

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  
  private getCategoryProductUrl = 
  'https://localhost:7023/api/CategoryProducts/ProductsCategories'; // Replace with your actual API URL

 

  getProductCategories(httpClient:HttpClient): Observable<ProductCategoryDTO[]> {

    return httpClient.get<ProductCategoryDTO[]>(this.getCategoryProductUrl);

  }
}
