import { Component } from '@angular/core';
import { ProductSelectedInfoComponent } from "../../Components/product-selected-info/product-selected-info.component";
import { ReviewSectionComponent } from "../../Components/review-section/review-section.component";
import { RelatedProductsComponent } from "../../Components/related-products/related-products.component";

@Component({
  selector: 'selected-product-info-page',
  imports: [ProductSelectedInfoComponent, ReviewSectionComponent, RelatedProductsComponent],
  templateUrl: './selected-product-info-page.component.html',
  styleUrl: './selected-product-info-page.component.css'
})
export class SelectedProductInfoPageComponent {

}
