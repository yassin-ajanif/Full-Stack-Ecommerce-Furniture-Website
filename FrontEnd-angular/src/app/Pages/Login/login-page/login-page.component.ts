import { Component, ElementRef, inject, Renderer2, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { Router, RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute } from '@angular/router';
import { logedUser } from '../../../Dtos/logedUser.dto';
import { overLayService } from '../../../Services/overLayService.service';
import { SpinnerService } from '../../../Services/spinner-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule,FormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  authService: AuthServiceService = inject(AuthServiceService);
  router: Router = inject(Router);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  overlayService = inject(overLayService);
  spinnerService = inject(SpinnerService);
  

   user : logedUser= {
      usernameOrEmail: '',
      password: '',
    };

  OnLogin() {
    
    this.spinnerService.showSpinner();

    this.authService.logIn(this.user).subscribe({

      next: (userToken) => {
        this.spinnerService.hideSpinner();
        this.resetForm();

        this.authService.deletePreviousTokenIfUserSignedBefore()
        this.authService.setUserTokenToBeSeenFromAnyAppCompnt(userToken)
        this.authService.storeTokenInLocalStorage(userToken)
        
        this.authService.autoLogout()
        //this.router.navigate(['/Home']);
        this.login()
      },
      error: (err) => {   
        this.spinnerService.hideSpinner();
        const errorMessage = err.error?.message || 'An unexpected error occurred';
    
        this.overlayService.showOverLay_Without_ConfirmationMode(errorMessage);
      }
    });
    
  }

  login(): void {
    
    const returnUrl = localStorage.getItem('UrlToRedirect') || '/';  // Default to home page if no returnUrl
    
    if(!returnUrl) this.router.navigate(['/Home']);
  
    localStorage.removeItem('UrlToRedirect');
    this.router.navigate([returnUrl]);
  }

  resetForm() {
    this.user.usernameOrEmail = '';
    this.user.password = '';
  }
}
