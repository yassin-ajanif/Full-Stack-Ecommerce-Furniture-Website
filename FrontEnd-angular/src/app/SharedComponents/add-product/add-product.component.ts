import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ProductDTO } from '../../Dtos/product.dto';
import { ProductService } from '../../Services/product.service';
import { HttpClient } from '@angular/common/http';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { ProductCategoryDTO } from '../../Dtos/productCategory.dto';

@Component({
  selector: 'add-product',
  imports: [FormsModule,CommonModule,DropdownComponent],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})

export class AddProductComponent implements OnInit {



 // Active section variable to control visibility of the form sections
 @Input() activeSection: string = 'add';  // Initially set to 'add' for the Add Product section
 productService : ProductService = inject(ProductService)
 // Data bindings for the form fields
 productName: string = '';
 productPrice: number = 0;
 productQuantity:number= 0;
 selectedCategory: string = '';
 productDescription: string = '';
  
 categoryNamesToPickByUser :string[]= []
 selectedImage : File | null = null
 selectedImageUrl: string | null = null;
 httpClient:HttpClient = inject(HttpClient)
 categoryProductService = inject(CategoryProductService)
 

 ngOnInit(): void {
 
   // we subscribe this component to the service subject when the categories are
   // loaded this componenets is going to load product categories
   this.categoryProductService.loadProductCategoryAsyn_At_Component(this)

}


whenUserSelectProductCategory_GetIt(selectedCategory: string): void {

  this.selectedCategory = selectedCategory;
  
}

 // Method to handle image selection (called when the user selects an image file)
 onImageSelected(event: any): void {
  
  const file = event.target.files[0];
  if (file) {
    
    this.selectedImage = file
    // Create a URL to preview the image
    this.selectedImageUrl = URL.createObjectURL(file);

  }
} 
      
 // Method to remove the selected image
 removeImage(): void {
   this.selectedImage = null;  // Clear the selected image
 }

 getCategoryIdOfProductNameSelected(categoryName: string): number {
  const category = this.categoryProductService.categories.find(cat => cat.name === categoryName);
  
  if (!category) {
    throw new Error(`Category "${categoryName}" not found.`);
  }

  return category.id;
}

 // Method to handle form submission
 addProduct(): void {
   // Basic validation check before submission
   if (!this.productName || !this.productPrice || !this.selectedCategory ) {
     
     alert('Please fill all the required fields.');
     return;

   }
    
   const selectedCategoryIDFromCategoryName : number= 
         this.getCategoryIdOfProductNameSelected(this.selectedCategory)
   
   const productDTO = new ProductDTO(
          0,
          this.productName,
          this.productDescription || '',
          this.productQuantity,
          this.productPrice,
          selectedCategoryIDFromCategoryName,
          this.selectedImage || null // Pass the File object directly
        );

   const addProductformData = new FormData();
   addProductformData.append('id', '0');
   addProductformData.append('name', productDTO.name);
   addProductformData.append('description', productDTO.description || '');
   addProductformData.append('stockQuantity', productDTO.stockQuantity.toString());
   addProductformData.append('price', productDTO.price.toString());
   addProductformData.append('categoryID',productDTO.categoryID.toString()); // Ensure category ID matches API
   
   // Append the image as a File (No conversion needed)
   if (productDTO.image) {
     addProductformData.append('imageData', productDTO.image, this.selectedImage!.name);
   }

  this.productService.sendProductAddedThroughApi(addProductformData)
      
    this.resetForm()
 }

 
 // Method to toggle between form sections
 toggleSection(section: string): void {
   this.activeSection = section;  // Set the active section to the clicked one
 }

 resetForm() {
  this.productName = '';
  this.productPrice = 0;
  this.productQuantity = 0;
  this.selectedCategory = '';
  this.productDescription = '';
  this.selectedImageUrl = null;
}
}
