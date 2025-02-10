import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'add-product',
  imports: [FormsModule,CommonModule,DropdownComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {
 // Active section variable to control visibility of the form sections
 @Input() activeSection: string = 'add';  // Initially set to 'add' for the Add Product section

 // Data bindings for the form fields
 productName: string = '';
 productPrice: number = 0;
 selectedCategory: string = '';
 productDescription: string = '';
 selectedImage: string | ArrayBuffer | null = null;  // For image preview
 categories: string[] = ['Category 1', 'Category 2', 'Category 3'];  // Example categories
 
 // Method to handle image selection (called when the user selects an image file)
 onImageSelected(event: any): void {
   const file = event.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onload = () => {
       this.selectedImage = reader.result;  // Store the image data as a string for preview
     };
     reader.readAsDataURL(file);  // Convert image to a base64-encoded string
   }
 }

 // Method to remove the selected image
 removeImage(): void {
   this.selectedImage = null;  // Clear the selected image
 }

 // Method to handle form submission
 addProduct(): void {
   // Basic validation check before submission
   if (!this.productName || !this.productPrice || !this.selectedCategory || !this.productDescription) {
     alert('Please fill all the required fields.');
     return;
   }

   // Create a new product object with the form data
   const newProduct = {
     name: this.productName,
     price: this.productPrice,
     category: this.selectedCategory,
     description: this.productDescription,
     image: this.selectedImage,  // Send the image data (you may want to send it as a byte array or base64 string to the backend)
   };

   console.log('Product added:', newProduct);
   // Call your API to add the product (you can replace the console.log with an actual API call)
   
   // Reset form fields after submission (optional)
   this.productName = '';
   this.productPrice = 0;
   this.selectedCategory = '';
   this.productDescription = '';
   this.selectedImage = null;
 }

 // Method to toggle between form sections
 toggleSection(section: string): void {
   this.activeSection = section;  // Set the active section to the clicked one
 }
}
