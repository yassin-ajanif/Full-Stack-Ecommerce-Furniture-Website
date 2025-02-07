import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from "../../../SharedComponents/dropdown/dropdown.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'product-and-category-page',
  imports: [FormsModule, DropdownComponent,DropdownComponent,CommonModule],
  templateUrl: './product-and-category-page.component.html',
  styleUrl: './product-and-category-page.component.css'
})
export class ProductAndCategoryPageComponent {
  categories = [
     'Electronics' ,
     'Clothing' ,
    'Accessories' 
  ];

  selectedCategory: number | null = null;
  productName = '';
  productPrice: number | null = null;
  productDescription = '';
  categoryName: string = '';
  isCategoryModalOpen: boolean = false;
  editingCategory: any = null;
  newCategoryName: string = '';
  deleteCategoryName: string = '';
  updatedCategoryName: string = '';
  selectedImage: string | ArrayBuffer | null = null; 
  showCategoryModal = false;
  activeSection: string = ''; // Default: No section shown
  showAdd: boolean = false;
  showUpdate: boolean = false;
  showDelete: boolean = false;

  searchQuery: string = ''; // Stores search input
  filteredProducts: any[] = []; // Stores filtered results
  products: any[] = [
    { name: 'Laptop' },
    { name: 'Smartphone' },
    { name: 'Headphones' },
    { name: 'Keyboard' },
    { name: 'Mouse' }
  ]; // Example products list (replace with actual data)
  
  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredProducts = []; // Clear results if input is empty
      return;
    }
  
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  

toggleSection(section: string) {
  this.showAdd = section === 'add' ? !this.showAdd : false;
  this.showUpdate = section === 'update' ? !this.showUpdate : false;
  this.showDelete = section === 'delete' ? !this.showDelete : false;
}

setActiveSection(section: string) {
  // If the clicked section is already active, hide it; otherwise, show it
  this.activeSection = this.activeSection === section ? '' : section;
}
   
onImageSelected(event: any) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      this.selectedImage = reader.result;
    };
    reader.readAsDataURL(file);
  }}
  removeImage() {
    this.selectedImage = null; // Clears the image preview
  }
  openAddCategoryModal() {
    this.showCategoryModal = true;
  }

  closeAddCategoryModal() {
    this.showCategoryModal = false;
    this.newCategoryName = '';
  }

  addCategory() {
    if (this.newCategoryName.trim()) {
      const newId = this.categories.length + 1;
      this.categories.push(this.newCategoryName );
      this.selectedCategory = newId;
      this.closeAddCategoryModal();
    }
  }

  onSubmit() {
    console.log('Product Submitted:', {
      category: this.selectedCategory,
      name: this.productName,
      price: this.productPrice,
      description: this.productDescription
    });
  }

  openCategoryModal() {
    this.categoryName = '';
    this.editingCategory = null;
    this.isCategoryModalOpen = true;
  }
  
  
  
  // Open Edit Mode
  editCategory(category: any) {
    this.editingCategory = category;
    this.categoryName = category.name;
    this.isCategoryModalOpen = true;
  }
  
  // Update Existing Category
  updateCategory() {
    if (this.categoryName.trim() && this.editingCategory) {
      this.editingCategory.name = this.categoryName;
      this.closeCategoryModal();
    }
  }
  
  // Delete Category
  deleteCategory() {
   // this.categories = this.categories.filter(cat => cat.id !== this.editingCategory.id);
   // this.closeCategoryModal();
  }
  
  // Close Modal
  closeCategoryModal() {
    this.isCategoryModalOpen = false;
    this.editingCategory = null;
  }
}
