import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
   
  isLogged : boolean= false

  constructor() { }

  Authenticate(username: string, password: string): boolean {
   
    // Example: Hardcoded credentials for testing
    const validUsername = 'admin';
    const validPassword = '12345';
  
    if (username === validUsername && password === validPassword) {
       this.isLogged=true
        return true;
      }
     
      return false;
    }

    
  }
  

