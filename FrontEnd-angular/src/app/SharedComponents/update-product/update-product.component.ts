import { Component, Input } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'update-product',
  imports: [DropdownComponent,CommonModule,FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent {

  // Input fields for product information
  @Input() activeSection :string = ''
  searchQuery: string = '';
  filteredProducts: any[] = [];  // Store filtered product list based on search query
  productName: string = '';
  productPrice: number = 0;
  selectedCategory: string = '';
  productDescription: string = '';
  selectedImage: string | ArrayBuffer | null = null;
  
  // List of categories (you can replace this with data from your backend or service)
  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];

  // Placeholder for the list of all products (this should be fetched from the backend)
  allProducts: any[] = [
    { name: 'Product 1', price: 100, category: 'Category 1', description: 'Description of Product 1' },
    { name: 'Product 2', price: 200, category: 'Category 2', description: 'Description of Product 2' },
    { name: 'Product 3', price: 150, category: 'Category 3', description: 'Description of Product 3' },
  ];

  // Search handler to filter products based on the search query
  onSearch(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = [];
      return;
    }
    
    this.filteredProducts = this.allProducts.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  // Handle image selection
  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;  // Store image data for preview
      };
      reader.readAsDataURL(file);  // Convert image to base64
    }
  }

  // Remove the selected image
  removeImage(): void {
    this.selectedImage = null;
  }

  // Update the product with the form data
  updateProduct(): void {
    // Basic validation check before updating the product
    if (!this.productName || !this.productPrice || !this.selectedCategory || !this.productDescription) {
      alert('Please fill all the required fields.');
      return;
    }

    // Logic to update product (for now, we are just logging the values)
    const updatedProduct = {
      name: this.productName,
      price: this.productPrice,
      category: this.selectedCategory,
      description: this.productDescription,
      image: this.selectedImage,  // Send the image data (base64 string)
    };

    console.log('Product updated:', updatedProduct);

    // Reset form fields after updating (optional)
    this.productName = '';
    this.productPrice = 0;
    this.selectedCategory = '';
    this.productDescription = '';
    this.selectedImage = null;
  }
}
