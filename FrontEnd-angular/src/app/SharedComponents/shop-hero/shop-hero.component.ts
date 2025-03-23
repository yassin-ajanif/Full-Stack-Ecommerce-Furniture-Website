import { Component, Input } from '@angular/core';

@Component({
  selector: 'shop-hero',
  imports: [],
  templateUrl: './shop-hero.component.html',
  styleUrl: './shop-hero.component.css'
})
export class ShopHeroComponent {
   
  @Input() pageName:string =""
  @Input() ActualPageName:string =""
}
