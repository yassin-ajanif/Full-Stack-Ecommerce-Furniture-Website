import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { signedUser } from '../../../Dtos/signedUser.dto';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { overLayService } from '../../../Services/overLayService.service';
import { SpinnerService } from '../../../Services/spinner-service.service';
import { UserToken } from '../../../Dtos/userToken.dto';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'sign-up-page',
  imports: [CommonModule,FormsModule,RouterOutlet, RouterLink],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.css'
})
export class SignUpPageComponent {

  @ViewChild('confirmPassword') confirmPassword!: NgModel;
  authService = inject(AuthServiceService)
  loaderService = inject(overLayService)
  spinnerService = inject(SpinnerService)
  router = inject(Router)

  user : signedUser= {
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  };

  onConfirmPasswordChange() {
    if (this.user.password !== this.user.confirmPassword) {
      // Manually set the error for mismatch
      this.confirmPassword.control.setErrors({ passwordMismatch: true });
    } else {
      // Reset the error if passwords match
      this.confirmPassword.control.setErrors(null);
    }
  }
  onSubmit(signupForm: NgForm) {

    if (signupForm.valid) {
      // Proceed with the form submission logic, such as calling a service to save the data
      this.signUp(this.user,signupForm)
      // Reset the form after submission (optional)
      
    }
  }

  signUp(user:signedUser,signupForm: NgForm){

    this.spinnerService.showSpinner()

    this.authService.signUp(user).subscribe({
      next: (userToken) => {
        
        this.spinnerService.hideSpinner()
        signupForm.reset(); 
        
       
        this.authService.deletePreviousTokenIfUserSignedBefore()
        this.authService.setUserTokenToBeSeenFromAnyAppCompnt(userToken)
        this.authService.storeTokenInLocalStorage(userToken)
        this.router.navigate(['/Home']);

      },
      error: (error) => {
        this.spinnerService.hideSpinner()
        this.loaderService.showOverLay_Without_ConfirmationMode(error.error[0])
      }
    });
    
        }

 
  

}
