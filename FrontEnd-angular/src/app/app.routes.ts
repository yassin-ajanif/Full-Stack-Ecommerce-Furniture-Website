import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/Home/home-page/home-page.component';
import { ShopPageComponent } from './Pages/Shop/shop-page/shop-page.component';
import { ContactPageComponent } from './Pages/Contact/contact-page/contact-page.component';
import { ProductComponent } from './SharedComponents/product/product.component';
import { ProductsComponent } from './Pages/Home/Components/products/products.component';
import { SelectedProductInfoPageComponent } from './Pages/SelectedProductInfo/SelectedProductInfoPage/selected-product-info-page/selected-product-info-page.component';
import { LoginPageComponent } from './Pages/Login/login-page/login-page.component';
import { LoginGuard } from './LoginGuard.guard';
import { CheckoutPageComponent } from './Pages/Checkout/checkout-page/checkout-page.component';
import { ChekoutGuard } from './CheckoutGuard.guard';
import { ContactGuard } from './Contact.guard';


export const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: 'Shop', component: ShopPageComponent },
  // can deactive if it ture it allow to go out of this route
  { path: 'Contact', component: ContactPageComponent, canDeactivate:[ContactGuard]},
  // can active if it ture it allow to go at this route
  { path: 'Checkout', component: CheckoutPageComponent,canActivate:[ChekoutGuard] },
  { path: 'Login', component: LoginPageComponent , canActivate:[LoginGuard]},
  { path: 'Products/Product/:id', component: SelectedProductInfoPageComponent },
  { path: '', redirectTo: 'Home', pathMatch: 'full' } // Default route
];

