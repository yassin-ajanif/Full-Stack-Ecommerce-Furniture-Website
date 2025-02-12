import { Component, ElementRef, inject, ViewChild, viewChild } from '@angular/core';
import { AuthServiceService } from '../../../Services/auth-service.service';
import { Router } from '@angular/router';
import { setAlternateWeakRefImpl } from '@angular/core/primitives/signals';

@Component({
  selector: 'login-page',
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  @ViewChild('LogedEmail')    userName! :ElementRef
  @ViewChild('LogedPassword') password! :ElementRef
  authService:AuthServiceService = inject(AuthServiceService)
  router : Router = inject(Router)

  OnLogin() {
       
    const email    = this.userName.nativeElement.value
    const password = this.password.nativeElement.value

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    // Example: Call authentication service
     const isLogged = this.authService.Authenticate(email, password);
     
     if(isLogged)  { alert("ok right") ; this.router.navigate(['/Home']);} 
      else alert ('false')
    
  }
}
