// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './Services/auth-service.service';


export const ChekoutGuard = () => {

    const authService = inject(AuthServiceService);  // Inject the AuthService
    const router = inject(Router);  // Inject the Router
    
    
    const allowToGoToCheckout = true
    
    // redirect the user to login page before being able to go checkout page 
    if(!allowToGoToCheckout) { alert('you need to log in'); router.navigate(['/Login']) }

    return allowToGoToCheckout
    
  };
