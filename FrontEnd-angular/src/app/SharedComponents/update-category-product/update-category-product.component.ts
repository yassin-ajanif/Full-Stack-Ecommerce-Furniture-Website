import { Component } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'update-category-product',
  imports: [DropdownComponent,FormsModule,CommonModule],
  templateUrl: './update-category-product.component.html',
  styleUrl: './update-category-product.component.css'
})
export class UpdateCategoryProductComponent {

  showUpdate: boolean = false;  // To toggle visibility of the update category section
  updatedCategoryName: string = '';  // To bind the input value for updating the category name
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];  // Dummy categories, replace with actual data
  selectedCategory: string = '';  // To store the selected category

  // Method to toggle visibility of the update category section
  toggleSection(section: string) {
    if (section === 'update') {
      this.showUpdate = !this.showUpdate;  // Toggle the showUpdate flag
    }
  }

  // Method to update the selected category (you can integrate with backend API to save the updated category)
  updateCategory() {
    if (this.selectedCategory && this.updatedCategoryName.trim()) {
      console.log('Category Updated:', this.selectedCategory, 'New Name:', this.updatedCategoryName);
      // You can now call a service to send the updated category to the backend here
      this.updatedCategoryName = '';  // Reset the input after updating the category
      this.showUpdate = false;  // Optionally close the input after updating the category
    } else {
      console.log('Please select a valid category and enter a new category name.');
    }
  }


}
