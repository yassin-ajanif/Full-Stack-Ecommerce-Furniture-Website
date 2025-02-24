import { Component, ElementRef, inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { ProductService } from '../../Services/product.service';
import { getProductDTO } from '../../Dtos/getProduct.dto';
import { AutoCompleteSearchBoxComponent } from '../auto-complete-search-box/auto-complete-search-box.component';
import { ProductDTO } from '../../Dtos/product.dto';
import { throwError } from 'rxjs';
import { overLayService } from '../../Services/overLayService.service';

@Component({
  selector: 'update-product',
  imports: [DropdownComponent,CommonModule,FormsModule,AutoCompleteSearchBoxComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {
  

  // Input fields for product information
  @Input() activeSection :string = ''
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  searchQuery: string = '';
  
  selectedCategory: string = '';
  
  selectedImage: string | ArrayBuffer | null = null;
  selectedImageFileToSend: File| null = null;
  
  productService = inject(ProductService)
  categoryProductService = inject(CategoryProductService)
  renderer: Renderer2 = inject(Renderer2)
  overlayService = inject(overLayService)

  categoryNamesToPickByUser: string[] = [];

  filteredProducts : getProductDTO[] = []
  filteredProductsName: string[] = [];
 // productNamePickedToUpdate:string =''
  productPickedToUpdateDto : ProductDTO =  ProductDTO.empty();

  
  ngOnInit(): void {
    
    this.loadCategoryProductNames()

  }

  loadCategoryProductNames(){

    this.categoryProductService.categoryNamesSubject.subscribe(categories => {

      this.categoryNamesToPickByUser = categories.map(category => category.name);
   
    }); 
  }

  onSearch(searchQuery:string): void {

  this.productService.searchProductsByPrefixNameAsync(searchQuery).
  subscribe((products) => {

    this.filteredProducts = products;
    this.filteredProductsName = products.map((product) => product.name);

  });
  
  }

 getProductPickedToUpdate(productNamePickedToUpdate: string){

  this.searchQuery = productNamePickedToUpdate

  const foundProduct = this.filteredProducts.find(
    product => product.name === productNamePickedToUpdate
  );

  if (!foundProduct) {
    throw new Error(`Product with name "${productNamePickedToUpdate}" not found.`);
  }

  const productImage : File|null = this.loadProductImage_And_GetItValue(foundProduct.id)
  const selectedCategoryName =  this.categoryProductService.getCategoryNameFromId(foundProduct.categoryID)
 
  if(selectedCategoryName===undefined) throw new Error(`not category found for ${foundProduct.id}.`);
   
  this.selectedCategory = selectedCategoryName
  this.productPickedToUpdateDto = new ProductDTO(
   
    foundProduct.id,
    foundProduct.name,
    foundProduct.description,
    foundProduct.stockQuantity,
    foundProduct.price,
    foundProduct.categoryID,
    productImage
  );

  

 }


  whenUserSelectProductCategory_GetIt(selectedCategory: string): void {

    this.selectedCategory = selectedCategory;
    
  }

  // Handle image selection
  onImageSelected(event: any): void {
    
    this.selectedImageFileToSend = event.target.files[0];
    
    if (this.selectedImageFileToSend) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;  // Store image data for preview
      };
      reader.readAsDataURL(this.selectedImageFileToSend);  // Convert image to base64
    }
  }


  deleteFileNameOfImageInput() {
    if (this.fileInput) {
      this.renderer.setProperty(this.fileInput.nativeElement, 'value', '');
    }
  }
  // Remove the selected image
  removeImage(): void {
    this.selectedImageFileToSend = null
    this.selectedImage = null;
    
    // delete file input
    this.deleteFileNameOfImageInput()

  }

  // Update the product with the form data
  updateProduct(): void {
    
    // Basic validation check before updating the product
    if (!this.productPickedToUpdateDto.name ||
       !this.productPickedToUpdateDto.price || 
       !this.selectedCategory ) {
      alert('Please fill all the required fields.');
      return;
    }

    const selectedCategoryIDFromCategoryName : number |undefined= 
            this.categoryProductService.
            getCategoryIdOfProductFromItName(this.selectedCategory)
      
    if(selectedCategoryIDFromCategoryName===undefined) {

              throw new Error(`cateogroy id is not found.`);

    } 

      const productDTO = new ProductDTO(
             this.productPickedToUpdateDto.id,
             this.productPickedToUpdateDto.name,
             this.productPickedToUpdateDto.description || '',
             this.productPickedToUpdateDto.stockQuantity,
             this.productPickedToUpdateDto.price,
             this.productPickedToUpdateDto.categoryID,
             this.selectedImageFileToSend || null // Pass the File object directly
           );
   
       const categoryIdOfProductToEdit = 
       this.categoryProductService.
       getCategoryIdOfProductFromItName(this.selectedCategory)

       if(categoryIdOfProductToEdit===undefined) {

        throw new 
        Error(`cateogroy name is not found for product id : ${categoryIdOfProductToEdit}`);

      } 
       

      const updateProductformData = new FormData();
      updateProductformData.append('id', productDTO.id.toString());
      updateProductformData.append('name', productDTO.name);
      updateProductformData.append('description', productDTO.description || '');
      updateProductformData.append('stockQuantity', productDTO.stockQuantity.toString());
      updateProductformData.append('price', productDTO.price.toString());
      updateProductformData.append('categoryID',categoryIdOfProductToEdit.toString()); // Ensure category ID matches API
      
      // Append the image as a File (No conversion needed)
      if (productDTO.image) {
        updateProductformData.append('imageData', productDTO.image, productDTO.image.name);
      }
     
     
      this.productService.updateProduct(updateProductformData).subscribe({
        next: (productIsUpdated) => {
          
          if(productIsUpdated) { this.resetForm(); this.searchQuery=''}
        },
     
      });
      
   
  }

   resetForm(){

this.productPickedToUpdateDto.name = '';
this.productPickedToUpdateDto.price = 0;
this.productPickedToUpdateDto.stockQuantity=0
this.selectedCategory = '';
this.productPickedToUpdateDto.description = '';
this.productPickedToUpdateDto.image = null;
this.removeImage()
   }

  loadProductImage_And_GetItValue(productId: number): File| null {
    
    this.productService.getProductImageById(productId).subscribe(imageBlob => {
      
      if(imageBlob==null) { this.selectedImage=null; return; }
      
      this.deleteFileNameOfImageInput()
      this.selectedImageFileToSend = new File([imageBlob], "image.png");
      const objectURL = URL.createObjectURL(imageBlob);
      this.selectedImage = objectURL;  // Set this URL as the image source
    
    });
      
    return this.selectedImageFileToSend 
  }
  
}
