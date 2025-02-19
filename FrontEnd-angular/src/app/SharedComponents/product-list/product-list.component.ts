import { Component, Input } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { ProductDTO } from '../../Dtos/product.dto';

@Component({
  selector: 'product-list',
  imports: [ProductComponent,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


   @Input() products!: ProductDTO[] ;
  
   
}
