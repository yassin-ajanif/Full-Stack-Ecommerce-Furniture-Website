// auth.guard.ts
import { inject, Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthServiceService } from './Services/auth-service.service';
import { UserToken } from './Dtos/userToken.dto';
import { filter, map, Observable, take } from 'rxjs';


export const ChekoutGuard = (): Observable<boolean> => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);

  return authService.isLoggedSubject.asObservable().pipe(
    // Wait until the authentication status is determined (i.e. not null)
    filter(isLogged => isLogged !== null),
    take(1),
    map(isLogged => isLogged? true : false )
    
  );
};
