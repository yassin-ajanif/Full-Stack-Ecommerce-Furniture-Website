import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'product-selected-info',
  imports: [FormsModule],
  templateUrl: './product-selected-info.component.html',
  styleUrl: './product-selected-info.component.css'
})
export class ProductSelectedInfoComponent {

  quantity: number = 1;
  maxQuantity : number = 10

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
