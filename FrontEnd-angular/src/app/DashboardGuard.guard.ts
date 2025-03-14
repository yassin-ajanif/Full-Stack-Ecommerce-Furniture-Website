// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './Services/auth-service.service';


export const DashboardGuard = () => {

    const authService = inject(AuthServiceService);  // Inject the AuthService
    const router = inject(Router)
    // if user is not already signed uout 
    const allowToGoToDashboard = authService.isAdmin
    
    
    if(!allowToGoToDashboard) router.navigate(['/Home'])
    return allowToGoToDashboard
    
  };
