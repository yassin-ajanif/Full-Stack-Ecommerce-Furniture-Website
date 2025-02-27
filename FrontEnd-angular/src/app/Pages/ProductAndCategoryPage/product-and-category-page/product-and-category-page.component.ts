import { Component ,inject} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from "../../../SharedComponents/dropdown/dropdown.component";
import { CommonModule } from '@angular/common';
import { ProductDTO } from '../../../Dtos/product.dto';
import { AddCategoryProductComponent } from "../../../SharedComponents/add-category-product/add-category-product.component";
import { UpdateCategoryProductComponent } from "../../../SharedComponents/update-category-product/update-category-product.component";
import { DeleteCategoryProductComponent } from "../../../SharedComponents/delete-category-product/delete-category-product.component";
import { AddProductComponent } from '../../../SharedComponents/add-product/add-product.component';
import { UpdateProductComponent } from "../../../SharedComponents/update-product/update-product.component";
import { DeleteProductComponent } from "../../../SharedComponents/delete-product/delete-product.component";
import { HttpClient } from '@angular/common/http';
import { CategoryProductService } from '../../../Services/CategoryProductService';
import { of } from 'rxjs';
import { OverlayMessageComponent } from '../../../SharedComponents/overlay-message/overlay-message.component';

@Component({
  selector: 'product-and-category-page',
  imports: [FormsModule, DropdownComponent, DropdownComponent, CommonModule,
    AddCategoryProductComponent, UpdateCategoryProductComponent,
    DeleteCategoryProductComponent, AddProductComponent, UpdateProductComponent, 
    DeleteProductComponent,OverlayMessageComponent],
  templateUrl: './product-and-category-page.component.html',
  styleUrl: './product-and-category-page.component.css'
})
export class ProductAndCategoryPageComponent {
  
  activeSection: string = ''; // Default: No section shown
  
  productsCategories : string[]=[]

  ProductToAdd! : ProductDTO
  httpClient:HttpClient = inject(HttpClient)
  categoryProductService = inject(CategoryProductService)
  
  

  ngOnInit(): void {
    
    this.categoryProductService.loadProductCategories().subscribe()
      
}

 
  setActiveSection(section: string) {
  // If the clicked section is already active, hide it; otherwise, show it
  this.activeSection = this.activeSection === section ? '' : section;
   }
 
  

}
