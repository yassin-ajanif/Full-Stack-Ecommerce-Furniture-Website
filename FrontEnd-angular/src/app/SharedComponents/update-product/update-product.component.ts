import { Component, inject, Input, OnInit } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { ProductService } from '../../Services/product.service';
import { getProductDTO } from '../../Dtos/getProduct.dto';

@Component({
  selector: 'update-product',
  imports: [DropdownComponent,CommonModule,FormsModule],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  

  // Input fields for product information
  @Input() activeSection :string = ''
  searchQuery: string = '';
    // Store filtered product list based on search query
  productName: string = '';
  productPrice: number = 0;
  selectedCategory: string = '';
  productDescription: string = '';
  selectedImage: string | ArrayBuffer | null = null;
  
  productService = inject(ProductService)
  categoryProductService = inject(CategoryProductService)

  categoryNamesToPickByUser: string[] = [];

  filteredProducts : getProductDTO[] = []
  filteredProductsName: string[] = [];

  ngOnInit(): void {
    
     this.categoryProductService.loadProductCategoryAsyn_At_Component(this)
  }

  onSearch(): void {

  this.productService.searchProductsByPrefixNameAsync(this.searchQuery).
  subscribe((products) => {

    this.filteredProducts = products;
    this.filteredProductsName = products.map((product) => product.name);

  });
  
}

  whenUserSelectProductCategory_GetIt(selectedCategory: string): void {

    this.selectedCategory = selectedCategory;
    
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
