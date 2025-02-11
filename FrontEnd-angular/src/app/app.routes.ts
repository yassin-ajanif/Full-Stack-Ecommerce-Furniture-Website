import { Routes } from '@angular/router';
import { HomePageComponent } from './Pages/Home/home-page/home-page.component';
import { ShopPageComponent } from './Pages/Shop/shop-page/shop-page.component';
import { ContactPageComponent } from './Pages/Contact/contact-page/contact-page.component';
import { ProductComponent } from './SharedComponents/product/product.component';
import { ProductsComponent } from './Pages/Home/Components/products/products.component';
import { SelectedProductInfoPageComponent } from './Pages/SelectedProductInfo/SelectedProductInfoPage/selected-product-info-page/selected-product-info-page.component';

export const routes: Routes = [
    {path:'Home', component:HomePageComponent},
    {path:'Shop', component:ShopPageComponent},
    {path:'Contact', component:ContactPageComponent},
    {path:'Products/Product/:id', component:SelectedProductInfoPageComponent},
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
  ];
