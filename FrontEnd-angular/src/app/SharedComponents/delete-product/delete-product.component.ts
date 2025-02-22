import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { AutoCompleteSearchBoxComponent } from '../auto-complete-search-box/auto-complete-search-box.component';
import { ProductService } from '../../Services/product.service';
import { ProductDTO } from '../../Dtos/product.dto';
import { getProductDTO } from '../../Dtos/getProduct.dto';

@Component({
  selector: 'delete-product',
  imports: [FormsModule,CommonModule,DropdownComponent,AutoCompleteSearchBoxComponent],
  templateUrl: './delete-product.component.html',
  styleUrl: './delete-product.component.css'
})
export class DeleteProductComponent implements OnInit{
  

  @Input() activeSection: string = 'delete';  // Set active section to 'delete'
  productIdToDelete!: number ;         // Holds the name of the product to be deleted
   
  filteredProductsName : string[]=[]
  filteredProducts : getProductDTO[] = []
  itemSelected : string = ''

  categoryProductService = inject(CategoryProductService)
  productService = inject(ProductService)

  ngOnInit(): void {
    
 
  }

 onSearch(searchQuery:string): void {
 
   this.productService.searchProductsByPrefixNameAsync(searchQuery).
   subscribe((products) => {
 
     this.filteredProducts = products;
     this.filteredProductsName = products.map((product) => product.name);
 
   });
   
   }
 
  getProductPickedIdToUpdate(productNamePickedToUpdate: string){
 
   const foundProduct = this.filteredProducts.find(
     product => product.name === productNamePickedToUpdate
   );
 
   if (!foundProduct) {
     throw new Error(`Product with name "${productNamePickedToUpdate}" not found.`);
   }
 
   this.productIdToDelete = foundProduct.id
 
  }
  // Function to handle the form submission and delete the product
  onDeleteProduct() {
    
   if(this.productIdToDelete===undefined) return
   
   this.productService.deleteProductByID(this.productIdToDelete).subscribe({
    next: (isDeleted) => {
      if (isDeleted) {
        console.log('Product deleted successfully');
      } else {
        console.error('Failed to delete product');
      }
    }
  });

  }

 

}
