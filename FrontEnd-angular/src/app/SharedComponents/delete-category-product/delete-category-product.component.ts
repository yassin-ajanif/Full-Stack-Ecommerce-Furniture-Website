import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CategoryProductService } from '../../Services/CategoryProductService';

@Component({
  selector: 'delete-category-product',
  imports: [FormsModule,CommonModule,DropdownComponent],
  templateUrl: './delete-category-product.component.html',
  styleUrl: './delete-category-product.component.css'
})
export class DeleteCategoryProductComponent implements OnInit{
   
  showDelete: boolean = false;  // To toggle visibility of the delete category section
  categoriesUserToPick: string[] = [];  // Dummy categories, replace with actual data
  selectedCategoryToDelete: string = '';  // To store the selected category to delete
  
  categoryProductService = inject(CategoryProductService)

  ngOnInit(): void {
    
    this.loadProductCategories()
  }

  loadProductCategories(){

    this.categoryProductService.categoryNamesSubject.subscribe(categories =>{
      
      this.categoriesUserToPick = categories.map(categories => categories.name)

    })

  }
  // Method to toggle visibility of the delete category section
  toggleSection(section: string) {
    if (section === 'delete') {
      this.showDelete = !this.showDelete;  // Toggle the showDelete flag
    }
  }

  whenUserPickCategoryGetIt(categorySelected:string){
    this.selectedCategoryToDelete=categorySelected
  }
  // Method to delete the selected category (you can integrate with backend API to delete the category)
  deleteCategory() {
   
    const categoryId_oF_CategorySelected = 
    this.categoryProductService.getCategoryIdOfProductFromItName(this.selectedCategoryToDelete)
     
    if(categoryId_oF_CategorySelected===undefined) return

    this.categoryProductService.
    DeleteProductCategoryByID(categoryId_oF_CategorySelected).subscribe(isDeleted=>{
      if(isDeleted) console.log("category is deleted succesffuly")
        
    })
  }
}
