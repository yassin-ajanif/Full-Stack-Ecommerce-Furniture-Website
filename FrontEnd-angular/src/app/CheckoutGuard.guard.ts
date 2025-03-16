// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './Services/auth-service.service';
import { UserToken } from './Dtos/userToken.dto';


export const ChekoutGuard = () => {

    const authService = inject(AuthServiceService);  // Inject the AuthService
    const router = inject(Router);  // Inject the Router
   
    
    const allowToGoToCheckout = authService.userToken
    
    // redirect the user to login page before being able to go checkout page 
    if(!allowToGoToCheckout) {  

     // router.navigate(['/Login']) 
      const currentUrl = 'http://localhost:4200/Checkout';  // Get current route (e.g., /checkout)
      router.navigate(['/login'], { queryParams: { returnUrl: currentUrl } });
    }

    return allowToGoToCheckout
    
  };
