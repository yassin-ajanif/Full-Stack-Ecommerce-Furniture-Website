import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Pages/Home/navbar/navbar.component';
import { HeroComponent } from './Pages/Home/hero/hero.component';
import { CategoriesComponent } from './Pages/Home/categories/categories.component';
import { ProductComponent } from './SharedComponents/product/product.component';
import { ProductsComponent } from "./Pages/Home/products/products.component";
import { ProductListComponent } from './SharedComponents/product-list/product-list.component';
import { CommonModule } from '@angular/common';
import { SetupShareComponent } from "./Pages/Home/setup-share/setup-share.component";
import { FooterComponent } from "./Pages/Home/footer/footer.component";
import { RoomInspirationsComponent } from "./Pages/Home/room-inspirations/room-inspirations.component";
import { ShopHeroComponent } from './Pages/Shop/shop-hero/shop-hero.component';
import { ShowingProductsParamsComponent } from "./Pages/Shop/showing-products-params/showing-products-params.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent, HeroComponent, CategoriesComponent,
    ProductListComponent, CommonModule, SetupShareComponent, FooterComponent,
    RoomInspirationsComponent, ShopHeroComponent, ShowingProductsParamsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EcommerceWebApp';
}
