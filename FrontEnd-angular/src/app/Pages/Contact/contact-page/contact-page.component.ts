import { Component } from '@angular/core';
import { ServiceAndWarrantyComponent } from "../../../SharedComponents/service-and-warranty/service-and-warranty.component";
import { ShopHeroComponent } from "../../../SharedComponents/shop-hero/shop-hero.component";

@Component({
  selector: 'contact-page',
  imports: [ServiceAndWarrantyComponent, ShopHeroComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {

}
