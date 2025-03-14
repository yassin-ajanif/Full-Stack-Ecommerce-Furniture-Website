import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductSelectedInfoComponent } from "../../Components/product-selected-info/product-selected-info.component";
import { ReviewSectionComponent } from "../../Components/review-section/review-section.component";
import { RelatedProductsComponent } from "../../Components/related-products/related-products.component";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'selected-product-info-page',
  imports: [ProductSelectedInfoComponent, ReviewSectionComponent, 
    RelatedProductsComponent],
  templateUrl: './selected-product-info-page.component.html',
  styleUrl: './selected-product-info-page.component.css'
})
export class SelectedProductInfoPageComponent implements OnInit,OnDestroy{
    
  //ActiveRoute!:ActivatedRoute;
  courseId!:number ;
 
  private routeSub!:Subscription
  constructor(private activatedRoute:ActivatedRoute){}
 
  ngOnInit(): void {

    // Using paramMap (reactive approach)
    this.routeSub= this.activatedRoute.paramMap.subscribe((params) => {
      this.courseId = Number(params.get('id'));
    });
   

      console.log(this.courseId)
     
    }

    ngOnDestroy(): void {
      
     if(this.routeSub) this.routeSub.unsubscribe()
       
    }
  


}
