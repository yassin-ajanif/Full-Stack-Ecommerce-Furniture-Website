import { Component, Input } from '@angular/core';
import { CategoriesComponent } from '../Components/categories/categories.component';
import { ProductListComponent } from '../../../SharedComponents/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { SetupShareComponent } from '../Components/setup-share/setup-share.component';
import { FooterComponent } from '../../../footer/footer.component';
import { RoomInspirationsComponent } from '../Components/room-inspirations/room-inspirations.component';
import { ShowingProductsParamsComponent } from '../../Shop/Components/showing-products-params/showing-products-params.component';
import { HeroComponent } from '../Components/hero/hero.component';
import { RouterOutlet } from '@angular/router';
import { ProductService } from '../../../Services/product.service';
import { ShopHeroComponent } from '../../Shop/Components/shop-hero/shop-hero.component';


@Component({
  selector: 'home-page',
  imports: [RouterOutlet,HeroComponent,CategoriesComponent,
    ProductListComponent,CommonModule,SetupShareComponent,FooterComponent,
    RoomInspirationsComponent,ShopHeroComponent,ShowingProductsParamsComponent],
    /*
    imports: [RouterOutlet, HeroComponent, CategoriesComponent,
      ProductListComponent, CommonModule, SetupShareComponent, FooterComponent,
      RoomInspirationsComponent, ShopHeroComponent, ShowingProductsParamsComponent],*/
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

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

    // we display only the first 8 products
    @Input() productsHomeSnapShot: {
      id: number;
      name: string;
      description: string;
      price: number;
      oldPrice: number;
      category: string;
      stock: number;
      rating: number;
      imageUrl: string;
    }[] = this.products.slice(0, 8);
}
