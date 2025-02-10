import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'delete-category-product',
  imports: [FormsModule,CommonModule,DropdownComponent],
  templateUrl: './delete-category-product.component.html',
  styleUrl: './delete-category-product.component.css'
})
export class DeleteCategoryProductComponent {


  showDelete: boolean = false;  // To toggle visibility of the delete category section
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];  // Dummy categories, replace with actual data
  selectedCategoryToDelete: string = '';  // To store the selected category to delete

  // Method to toggle visibility of the delete category section
  toggleSection(section: string) {
    if (section === 'delete') {
      this.showDelete = !this.showDelete;  // Toggle the showDelete flag
    }
  }

  // Method to delete the selected category (you can integrate with backend API to delete the category)
  deleteCategory() {
    if (this.selectedCategoryToDelete) {
      console.log('Category Deleted:', this.selectedCategoryToDelete);
      // You can now call a service to delete the selected category from the backend here
      this.selectedCategoryToDelete = '';  // Reset the selected category after deletion
      this.showDelete = false;  // Optionally close the input after deleting the category
    } else {
      console.log('Please select a category to delete.');
    }
  }
}
