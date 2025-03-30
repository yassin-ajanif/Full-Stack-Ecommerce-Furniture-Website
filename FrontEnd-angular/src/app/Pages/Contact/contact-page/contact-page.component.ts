import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ServiceAndWarrantyComponent } from "../../../SharedComponents/service-and-warranty/service-and-warranty.component";
import { ShopHeroComponent } from "../../../SharedComponents/shop-hero/shop-hero.component";
import { CommonModule } from '@angular/common';
import { overLayService } from '../../../Services/overLayService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'contact-page',
  standalone: true,
  imports: [ReactiveFormsModule,
     ServiceAndWarrantyComponent, 
     ShopHeroComponent,FormsModule,CommonModule], 
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css'
})
export class ContactPageComponent {
 
  overlayService = inject(overLayService)
  router = inject(Router)

  contactForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', Validators.required),
    message: new FormControl('', [Validators.required, Validators.minLength(10)])
  });

  isAnyFieldFilled(): boolean {
    return Object.values(this.contactForm.controls)
    .some(control => control.value && control.value.trim() !== '');
  }


  onSubmit() {

    if (this.contactForm.valid) {
      
      this.overlayService.showOverLay_Without_ConfirmationMode("thank you for your submition, we will contact you soon")
      this.contactForm.reset();
      this.router.navigate(['Shop'])
    } else {

      this.overlayService.showOverLay_Without_ConfirmationMode("your data is invalid")

    }
  }

  canExitPage():boolean{

    const userHasStartedToFillContactInfo =  this.isAnyFieldFilled()

    if(userHasStartedToFillContactInfo) return confirm('are you sure to leave the page')
    return true
  }
}
