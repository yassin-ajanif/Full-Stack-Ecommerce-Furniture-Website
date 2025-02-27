import { EventEmitter, inject, Injectable, OnInit } from '@angular/core';
import { ProductDTO } from '../Dtos/product.dto';
import { HttpClient } from '@angular/common/http';
import {  HttpHeaders } from '@angular/common/http';
import { firstValueFrom, forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';
import { getProductDTO } from '../Dtos/getProduct.dto';
import { SpinnerService } from './spinner-service.service';
import { overLayService } from './overLayService.service';
import { displayProductDTO } from '../Dtos/displayProduct.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService  {

  constructor() { }
  
  httpClient:HttpClient = inject(HttpClient)
  spinnerService = inject(SpinnerService)
  overlayMessageBoxService = inject(overLayService)

    private baseUrl : string = "https://localhost:7023/api/Products"
   
    productsToLoadAtShopPage : displayProductDTO[] = [];
 
    loadAllProducts():Observable<getProductDTO[]>{
      
    return this.httpClient.get<getProductDTO[]>(`${this.baseUrl}/Allproducts`)
  
    }
   
    sendProductAddedThroughApi(addProductFromData: FormData): Observable<boolean> {
      
      this.spinnerService.showSpinner()
 
      return this.httpClient.post(this.baseUrl + '/Addproduct', addProductFromData).pipe(
        
        map(() => {  

          this.spinnerService.hideSpinner()
          this.overlayMessageBoxService.
          showOverLay_Without_ConfirmationMode("product added successfully")

          return true;
        }),
        catchError((error) => {
          
          this.spinnerService.hideSpinner()
          this.overlayMessageBoxService.
          showOverLay_Without_ConfirmationMode("something went wrong")

          return throwError(() => error); // Rethrow the error
        })
      );
    }
    
    updateProduct(updateProductFromData: FormData): Observable<boolean> {
    
      this.spinnerService.showSpinner(); // Show spinner before request starts
  
      return this.httpClient.put(`${this.baseUrl}/Updateproduct`, updateProductFromData).pipe(
          
          map(() => {
            this.spinnerService.hideSpinner()
          this.overlayMessageBoxService.
          showOverLay_Without_ConfirmationMode("product updated successfully")
              return true;
          }),
          catchError((error) => {
            this.spinnerService.hideSpinner()
          this.overlayMessageBoxService.
          showOverLay_Without_ConfirmationMode("something went wrong")
              return throwError(() => error); // Rethrow the error
          }) 
      );
    }
  
    deleteProductByID(id: number): Observable<boolean> {
      
    this.spinnerService.showSpinner(); 
  
    return this.httpClient.delete<void>(`${this.baseUrl}/delete/${id}`).pipe(
      map(() => {  
        this.spinnerService.hideSpinner();
        this.overlayMessageBoxService.showOverLay_Without_ConfirmationMode("Product deleted successfully");
        return true;
      }),
      catchError(() => {
        this.spinnerService.hideSpinner();
        this.overlayMessageBoxService.showOverLay_Without_ConfirmationMode("Something went wrong");
        return of(false); // Return false instead of throwing an error
      })
    );
    }
  
    searchProductsByPrefixNameAsync(namePrefix: string): Observable<getProductDTO[]> {
      
      // If namePrefix is empty, return an empty array as Observable
      if (namePrefix.trim() === '') {
        return of([]);  // Return an empty observable array
      }
        
      return this.httpClient.get<getProductDTO[]>(
        `${this.baseUrl}/search?namePrefix=${namePrefix}`
      );
    }
    
    getProductImageById(productId: number): Observable<Blob> {
      return this.httpClient.get(`${this.baseUrl}/GetProductImage/${productId}`, 
        { responseType: 'blob' });
    }
    
    loadProductImage_And_GetItValue(productId: number): Observable<string | null> {
      return this.getProductImageById(productId).pipe(
        map(imageBlob => {
          if (!imageBlob) return null;
          const file = new File([imageBlob], "image.png");
          return URL.createObjectURL(file); // Convert File to Blob URL
        })
      );
    }

  
    loadImagesOfTheseProducts(products: displayProductDTO[]): Observable<displayProductDTO[]> {
      return forkJoin(
        products.map(product =>
          this.loadProductImage_And_GetItValue(product.id).pipe(
            map(productImageUrl => ({ ...product, imageUrl: productImageUrl })) // New object reference
          )
        )
      );
    }
    
 
}  
