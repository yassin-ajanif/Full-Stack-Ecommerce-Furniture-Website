import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './Pages/Home/navbar/navbar.component';
import { HeroComponent } from './Pages/Home/hero/hero.component';
import { CategoriesComponent } from './Pages/Home/categories/categories.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NavbarComponent,HeroComponent,CategoriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EcommerceWebApp';
}
