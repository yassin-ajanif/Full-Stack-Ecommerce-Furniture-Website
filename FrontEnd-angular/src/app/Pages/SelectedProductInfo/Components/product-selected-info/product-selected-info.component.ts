import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'product-selected-info',
  imports: [FormsModule],
  templateUrl: './product-selected-info.component.html',
  styleUrl: './product-selected-info.component.css'
})
export class ProductSelectedInfoComponent implements OnInit {

  quantity: number = 1;
  maxQuantity : number = 10
  productImageUrl: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    
    this.fetchProductImage(17)
  }

  fetchProductImage(productId: number): void {
    this.http.get(`https://localhost:7023/api/Products/GetProductImage/${productId}`, { responseType: 'blob' })
      .subscribe(
        (imageBlob: Blob) => {
          // Create a URL for the Blob and assign it to the productImageUrl property
          this.productImageUrl = URL.createObjectURL(imageBlob);
        },
        (error) => {
          console.error('Error fetching the product image:', error);
        }
      );
  }
  


  decrease() {
   
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increase() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }
}
