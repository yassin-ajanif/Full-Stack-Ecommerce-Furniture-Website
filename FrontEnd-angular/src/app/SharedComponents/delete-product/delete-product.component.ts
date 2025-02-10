import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'delete-product',
  imports: [FormsModule,CommonModule,DropdownComponent],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent {
  @Input() activeSection: string = 'delete';  // Set active section to 'delete'
  productName: string = '';         // Holds the name of the product to be deleted
  selectedCategory: string = '';    // Holds the selected category
  categories: string[] = ['Category 1', 'Category 2', 'Category 3']; // Example categories

  // Function to handle the form submission and delete the product
  onDeleteProduct() {
    if (this.productName && this.selectedCategory) {
      // Logic to delete the product from the backend or service
      console.log(`Deleting product: ${this.productName} in category: ${this.selectedCategory}`);
      // Reset fields after deletion (optional)
      this.productName = '';
      this.selectedCategory = '';
    } else {
      // Handle error (for example, show a message)
      console.error('Please fill out both the product name and category.');
    }
  }
}
