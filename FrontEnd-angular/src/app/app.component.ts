import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from "./footer/footer.component";
import { HomePageComponent } from "./Pages/Home/home-page/home-page.component";
import { ShopPageComponent } from './Pages/Shop/shop-page/shop-page.component';


@Component({
  selector: 'app-root',

  imports: [RouterOutlet, NavbarComponent, CommonModule, FooterComponent,
     HomePageComponent,ShopPageComponent],

  
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EcommerceWebApp';
}
