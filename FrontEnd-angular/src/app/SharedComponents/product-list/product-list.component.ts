import { AfterViewChecked, AfterViewInit, Component, inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ProductComponent } from '../product/product.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../Services/product.service';
import { ProductDTO } from '../../Dtos/product.dto';
import { getProductDTO } from '../../Dtos/getProduct.dto';
import { catchError, delay, finalize, map, tap } from 'rxjs/operators';
import { firstValueFrom, forkJoin, Observable, of, Subscription, throwError } from 'rxjs';
import { displayProductDTO } from '../../Dtos/displayProduct.dto';
import { CategoryProductService } from '../../Services/CategoryProductService';
import { ProductCategoryDTO } from '../../Dtos/productCategory.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'product-list',
  imports: [ProductComponent,CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent   {
  
 
   @Input() products: displayProductDTO[] =[];

 


}
