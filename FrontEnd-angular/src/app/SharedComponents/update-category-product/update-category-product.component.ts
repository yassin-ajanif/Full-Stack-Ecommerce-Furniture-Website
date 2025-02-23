import { Component, inject, OnInit } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { getProductDTO } from '../../Dtos/getProduct.dto';
import { ProductCategoryDTO } from '../../Dtos/productCategory.dto';
import { overLayService } from '../../Services/overLayService.service';

@Component({
  selector: 'update-category-product',
  imports: [DropdownComponent,FormsModule,CommonModule],
  templateUrl: './update-category-product.component.html',
  styleUrl: './update-category-product.component.css'
})
export class UpdateCategoryProductComponent implements OnInit{
  
  
  showUpdate: boolean = false;  // To toggle visibility of the update category section
  updatedCategoryName: string = '';  // To bind the input value for updating the category name
  categoryNamesToPickByUser: string[] = [];  // Dummy categories, replace with actual data
  selectedCategory: string = '';  // To store the selected category
  
  categoryProductService = inject(CategoryProductService)
  overlayerService = inject(overLayService)

  ngOnInit(): void {

    this.loadCategoryProductNames()
  }

  loadCategoryProductNames(){

    this.categoryProductService.categoryNamesSubject.subscribe(categories => {

      this.categoryNamesToPickByUser = categories.map(category => category.name);
   
    }); 
  
}
  // Method to toggle visibility of the update category section
  toggleSection(section: string) {
    if (section === 'update') {
      this.showUpdate = !this.showUpdate;  // Toggle the showUpdate flag
    }
  }

  whenUserSelectProductCategory_GetIt(selectedCategory:string){
     this.selectedCategory = selectedCategory
  }
  // Method to update the selected category (you can integrate with backend API to save the updated category)
  
    testOperation() : Promise<string>{
       
    return new Promise((resolve,reject)=>{

        setTimeout(() => {
           let operationSuccess = true 
                if(operationSuccess)  resolve("operation succeded") 
                else reject("operation failed")
        }, 5000);
    })

   }

   
    updateCategory() {

     const CategoryDtoToUpdate : ProductCategoryDTO |undefined= 
    this.categoryProductService.categories.
    find(category => category.name === this.selectedCategory);
    
    if(CategoryDtoToUpdate===undefined) return
      
    CategoryDtoToUpdate.name = this.updatedCategoryName;  // To bind the input value for updating the category name

    
    
    this.categoryProductService.UpdateProductCategory(CategoryDtoToUpdate)
      .subscribe(isProductUpdated => {
      
       if(isProductUpdated)  {

         this.categoryProductService.loadProductCategories();
         
         this.overlayerService.
         showOverLay_Without_ConfirmationMode("categrory is updated succes")
         
       }
       else                  console.log("categoryproduct failded to update")
  
    });
  
    
  }


}
