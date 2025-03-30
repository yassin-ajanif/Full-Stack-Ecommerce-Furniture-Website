import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { OverlayMessageComponent } from '../overlay-message/overlay-message.component';
import { overLayService } from '../../Services/overLayService.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'delete-category-product',
  imports: [FormsModule,CommonModule,DropdownComponent],
  templateUrl: './delete-category-product.component.html',
  styleUrl: './delete-category-product.component.css'
})
export class DeleteCategoryProductComponent implements OnInit, OnDestroy{
 
   
  showDelete: boolean = false;  // To toggle visibility of the delete category section
  categoriesUserToPick: string[] = [];  // Dummy categories, replace with actual data
  selectedCategoryToDelete: string = '';  // To store the selected category to delete
  
  categoryProductService = inject(CategoryProductService)
  overlayServiceMessageBox = inject(overLayService)
  deleteCategoryProductSub!:Subscription
  refreshCategoryProductSub!:Subscription

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

  restForm(){
    this.selectedCategoryToDelete = ""
  }
  // Method to delete the selected category (you can integrate with backend API to delete the category)
  async deleteCategory() {
   
    const categoryId_oF_CategorySelected = 
    this.categoryProductService.getCategoryIdOfProductFromItName(this.selectedCategoryToDelete)
     
    if(categoryId_oF_CategorySelected===undefined) {
      alert("select category to delete") ;return }

    const userHasApprovedTodeleteCategory = 
    await this.overlayServiceMessageBox.
    showOverLay_With_ConfirmationMode_And_Return_If_YES_or_Not
    ("do you really want to delete this product")
   
    if(!userHasApprovedTodeleteCategory) return 

    this.deleteCategoryProductSub = this.categoryProductService.
    DeleteProductCategoryByID(categoryId_oF_CategorySelected!).subscribe(isDeleted=>{
      
      if(isDeleted) { 
        this.restForm() 
        this.refreshCategoryProductSub=this.categoryProductService.loadProductCategories().subscribe();
      }
       
      else this.overlayServiceMessageBox.showOverLay_Without_ConfirmationMode("this category already have products")
    })
  }

  ngOnDestroy(){

    if(this.deleteCategoryProductSub) this.deleteCategoryProductSub.unsubscribe()

    if(this.refreshCategoryProductSub) this.refreshCategoryProductSub.unsubscribe()
  }
}
