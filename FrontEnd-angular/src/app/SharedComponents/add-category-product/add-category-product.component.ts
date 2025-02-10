import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCategoryDTO } from '../../Dtos/productCategory.dto';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'add-category-product',
  imports: [FormsModule, CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './add-category-product.component.html',
  styleUrls: ['./add-category-product.component.css']
})
export class AddCategoryProductComponent  {

  showAdd: boolean = false;  // Control visibility of the add category form
  categoryForm: FormGroup;  // FormGroup for handling the form controls

  categoryToAdd!: string;  // List to store the added categories
  private apiUrl = 'https://localhost:7023/api/CategoryProducts/product-categories';

  constructor(private fb: FormBuilder,private http: HttpClient) { 
    // Initialize categoryForm in the constructor
    this.categoryForm = this.fb.group({
      categoryName: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }
  

  toggleSection(section: string): void {
    if (section === 'add') {
      this.showAdd = !this.showAdd;
    }
  }
 

  AddProductCategoryApi(productCategory: ProductCategoryDTO): Promise<any> {
    return this.http.post('https://localhost:7023/api/CategoryProducts/product-categories', productCategory)
      .toPromise()  // You can use `toPromise` for simpler handling of promises in Angular
      .then(response => {
        console.log('Response:', response);
        return response;
      })
      .catch(error => {
        console.error('Error in API call:', error);
        throw error;
      });
  }


   
  addCategory(): void {

    if (!this.categoryForm.valid) return
      // If valid, add the category to the list
      const categoryName = this.categoryForm.get('categoryName')!.value;
      const productCategory = new ProductCategoryDTO(categoryName);
      this.AddProductCategoryApi(productCategory);
      this.categoryForm.reset();  // Reset the form after submission
      this.showAdd = false;  // Hide the form after adding
    
  }
}
