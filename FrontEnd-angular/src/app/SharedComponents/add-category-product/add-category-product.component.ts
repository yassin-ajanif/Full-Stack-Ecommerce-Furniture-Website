import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryDTO } from '../../Dtos/productCategory.dto';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { OverlayMessageComponent } from '../overlay-message/overlay-message.component';

@Component({
  selector: 'add-category-product',
  imports: [FormsModule, CommonModule,ReactiveFormsModule,OverlayMessageComponent],
  templateUrl: './add-category-product.component.html',
  styleUrls: ['./add-category-product.component.css']
})
export class AddCategoryProductComponent  implements OnInit{

  showAdd: boolean = false;  // Control visibility of the add category form
  categoryForm: FormGroup;  // FormGroup for handling the form controls

  categoryToAdd!: string;  // List to store the added categories
  categoryProductService = inject(CategoryProductService)

  constructor(private fb: FormBuilder) { 
    // Initialize categoryForm in the constructor
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
   
   
  }
  

  toggleSection(section: string): void {
    if (section === 'add') {
      this.showAdd = !this.showAdd;
    }
  }
 
  addCategory(): void {

    if (!this.categoryForm.valid) return
      // If valid, add the category to the list
      const categoryName = this.categoryForm.get('categoryName')!.value;
      const productCategory = new ProductCategoryDTO(categoryName);
     
      this.categoryProductService.AddProductCategory(productCategory).subscribe(
        
        (isCategoryAdded) => {

          if(isCategoryAdded) this.categoryProductService.loadProductCategories()
          
        }
      );
     
      this.categoryForm.reset();  // Reset the form after submission
      this.showAdd = false;  // Hide the form after adding*/
  }

}
