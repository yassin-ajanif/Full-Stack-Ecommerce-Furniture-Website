import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/Home/home-page/home-page.component';
import { ShopPageComponent } from './Pages/Shop/shop-page/shop-page.component';
import { ContactPageComponent } from './Pages/Contact/contact-page/contact-page.component';
import { ProductComponent } from './SharedComponents/product/product.component';
import { ProductsComponent } from './Pages/Home/Components/products/products.component';
import { SelectedProductInfoPageComponent } from './Pages/SelectedProductInfo/SelectedProductInfoPage/selected-product-info-page/selected-product-info-page.component';
import { LoginPageComponent } from './Pages/Login/login-page/login-page.component';
import { DashboardGuard } from './DashboardGuard.guard';
import { CheckoutPageComponent } from './Pages/Checkout/checkout-page/checkout-page.component';
import { ChekoutGuard } from './CheckoutGuard.guard';
import { ContactGuard } from './Contact.guard';
import { SignUpPageComponent } from './Pages/Login/sign-up-page/sign-up-page.component';
import { ProductAndCategoryPageComponent } from './Pages/ProductAndCategoryPage/product-and-category-page/product-and-category-page.component';
import { AboutComponent } from './Pages/about/about.component';
import { NotFoundPageComponent } from './Pages/not-found-page/not-found-page.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { PrivacyPolicyComponent } from './Pages/privacy-policy/privacy-policy.component';
import { ReturnsComponent } from './Pages/returns/returns.component';
import { UserDashboardComponent } from './Pages/UserDashboard/user-dashboard.component';

export const routes: Routes = [
  { path: 'Home', component: HomePageComponent },
  { path: 'Shop', component: ShopPageComponent },
  // can deactive if it ture it allow to go out of this route
  { path: 'Contact', component: ContactPageComponent, canDeactivate:[ContactGuard]},
  // can active if it ture it allow to go at this route
  { path: 'Checkout', component: CheckoutPageComponent,canActivate:[ChekoutGuard] },
  { path: 'SignUp', component: SignUpPageComponent },
  { path: 'Login', component: LoginPageComponent },
  { path: 'Products/Product/:id', component: SelectedProductInfoPageComponent },   
  { path: 'Dashboard', component: ProductAndCategoryPageComponent , canActivate : [DashboardGuard]},   
  { path: 'About', component: AboutComponent },   
  { path: '', redirectTo: 'Home', pathMatch: 'full' } ,// Default route
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'returns', component: ReturnsComponent },
  { path: 'UserDashboard', component: UserDashboardComponent },
  { path: '**', component: NotFoundPageComponent }, // Not Found route
  
];



