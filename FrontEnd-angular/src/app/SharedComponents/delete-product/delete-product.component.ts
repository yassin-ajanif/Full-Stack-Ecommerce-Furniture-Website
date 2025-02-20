import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CategoryProductService } from '../../Services/CategoryProductService';

@Component({
  selector: 'delete-product',
  imports: [FormsModule,CommonModule,DropdownComponent],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent implements OnInit{
  

  @Input() activeSection: string = 'delete';  // Set active section to 'delete'
  productName: string = '';         // Holds the name of the product to be deleted
    // Holds the selected category
  categoryProductService = inject(CategoryProductService)

  ngOnInit(): void {
    
 
  }

  // Function to handle the form submission and delete the product
  onDeleteProduct() {
    
  
   
   
  }

 

}
