import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { HomePageComponent } from "./Pages/Home/home-page/home-page.component";
import { ShopPageComponent } from './Pages/Shop/shop-page/shop-page.component';
import { SelectedProductInfoPageComponent } from "./Pages/SelectedProductInfo/SelectedProductInfoPage/selected-product-info-page/selected-product-info-page.component";
import { CartComponent } from "./Pages/Cart/cart/cart.component";
import { CheckoutPageComponent } from "./Pages/Checkout/checkout-page/checkout-page.component";
import { ContactPageComponent } from "./Pages/Contact/contact-page/contact-page.component";


@Component({
  selector: 'app-root',

  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent,
    HomePageComponent, ShopPageComponent, SelectedProductInfoPageComponent,
    CartComponent, CheckoutPageComponent, CheckoutPageComponent, ContactPageComponent],

  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EcommerceWebApp';
}
