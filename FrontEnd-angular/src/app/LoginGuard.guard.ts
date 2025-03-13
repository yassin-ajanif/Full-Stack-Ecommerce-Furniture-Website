// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './Services/auth-service.service';


export const LoginGuard = () => {

    const authService = inject(AuthServiceService);  // Inject the AuthService
    const router = inject(Router);  // Inject the Router
    
    // if user is not already signed uout 
    const allowToGoToLoginPage = true
    
    
    
    return allowToGoToLoginPage
    
  };
