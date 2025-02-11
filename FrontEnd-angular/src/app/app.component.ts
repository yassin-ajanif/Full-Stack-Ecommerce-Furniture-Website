import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { HomePageComponent } from "./Pages/Home/home-page/home-page.component";
import { ShopPageComponent } from './Pages/Shop/shop-page/shop-page.component';
import { SelectedProductInfoPageComponent } from "./Pages/SelectedProductInfo/SelectedProductInfoPage/selected-product-info-page/selected-product-info-page.component";
import { CartComponent } from "./Pages/Cart/cart/cart.component";
import { CheckoutPageComponent } from "./Pages/Checkout/checkout-page/checkout-page.component";
import { ContactPageComponent } from "./Pages/Contact/contact-page/contact-page.component";
import { LoginPageComponent } from "./Pages/Login/login-page/login-page.component";
import { ProductAndCategoryPageComponent } from "./Pages/ProductAndCategoryPage/product-and-category-page/product-and-category-page.component";


@Component({
  selector: 'app-root',

  imports: [RouterOutlet, RouterLink,RouterLinkActive,NavbarComponent, CommonModule, FooterComponent,
    HomePageComponent, ShopPageComponent, SelectedProductInfoPageComponent,
    CartComponent, CheckoutPageComponent, CheckoutPageComponent, 
    ContactPageComponent, LoginPageComponent, ProductAndCategoryPageComponent,],

  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent {
  title = 'EcommerceWebApp';

   
}
