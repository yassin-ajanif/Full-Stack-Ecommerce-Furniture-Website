import { Component, Input } from '@angular/core';
import { ShopHeroComponent } from "../Components/shop-hero/shop-hero.component";
import { ShowingProductsParamsComponent } from '../Components/showing-products-params/showing-products-params.component';
import { ProductListComponent } from "../../../SharedComponents/product-list/product-list.component";
import { ProductService } from '../../../Services/product.service';
import { ServiceAndWarrantyComponent } from "../../../SharedComponents/service-and-warranty/service-and-warranty.component";

@Component({
  selector: 'shop-page',
  imports: [ShopHeroComponent, ShowingProductsParamsComponent, ProductListComponent, 
    ServiceAndWarrantyComponent],
  templateUrl: './shop-page.component.html',
  styleUrl: './shop-page.component.css'
})
export class ShopPageComponent {
  
   @Input() products: {
        id: number;
        name: string;
        description: string;
        price: number;
        oldPrice: number;
        category: string;
        stock: number;
        rating: number;
        imageUrl: string;
      }[] = new ProductService().products;
}
