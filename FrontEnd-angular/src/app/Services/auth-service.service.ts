import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, Subscription, throwError } from 'rxjs';
import { UserToken } from '../Dtos/userToken.dto';
import { HttpClient } from '@angular/common/http';
import { signedUser } from '../Dtos/signedUser.dto';
import { logedUser } from '../Dtos/logedUser.dto';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
   
  
  userToken! : UserToken |null
  router = inject(Router)
  verifyTokenSubsrption! : Subscription
  timerFunction : any
  isAdmin : boolean = false;
  isLoggedSubject  = new BehaviorSubject<Boolean|null>(null)

  private singUpEndPoint = 'https://localhost:7023/api/Account/signup';  // Endpoint for sign-up
  private logInEndPoint =  'https://localhost:7023/api/Account/login'; 
  private verifyToKenEndPoint = "https://localhost:7023/api/Account/validate"

  constructor(private http: HttpClient) {}

  signUp(signedUser:signedUser): Observable<UserToken> {

    const payload = {
      userName: signedUser.username,
      email: signedUser.email,
      password: signedUser.password
    };

    return this.http.post<{ token: { token: string, expirationDate: string } }>(this.singUpEndPoint, payload)
      .pipe(
        map(response => {
          const token = response.token.token;
          const expirationDate = new Date(response.token.expirationDate);
          return new UserToken(token, expirationDate);
        })
      );
  }
    
  logIn(logedUser:logedUser):Observable<UserToken>{
     
    const payload = {
      usernameOrEmail: logedUser.usernameOrEmail,
      password: logedUser.password
    };

      this.isAdmin = logedUser.usernameOrEmail==='admin'

    return this.http.post<{ token: { token: string, expirationDate: string } }>(this.logInEndPoint, payload)
      .pipe(
        map(response => {
          const token = response.token.token;
          const expirationDate = new Date(response.token.expirationDate);
          this.isLoggedSubject.next(true)
          return new UserToken(token, expirationDate);
        })
      );

  }

  verifyToken(userToken:UserToken){

     return this.http.post(this.verifyToKenEndPoint,userToken)
  }

  logOut(){

    this.isLoggedSubject.next(false) 
    this.userToken = null;
    this.deletePreviousTokenIfUserSignedBefore()
    if(this.isAdmin) this.router.navigate(['/Home'])
  }

  autoLogin()  {

    const getstoredTokenFromLocalStorage = localStorage.getItem("userToken");

    if (!getstoredTokenFromLocalStorage) {
      
      return; // No token found, user is not logged in
    }
  
    try {

      const userTokenData = JSON.parse(getstoredTokenFromLocalStorage);
      this.isAdmin = this.checkIfUserIsAdminFromLocalStorage()

      const userToken = new UserToken(userTokenData.token, new Date(userTokenData.tokenExpiresIn));
      
      if(userToken.isExpired()) { this.logOut(); }
    
      this.verifyTokenSubsrption = this.verifyToken(userToken).subscribe({
        next: (isValid) => {
            
            this.isLoggedSubject.next(true)
            this.setUserTokenToBeSeenFromAnyAppCompnt(userToken);
            // get excuted when the token is expired
            this.autoLogout()
            
        },
        error: () => {
          this.isLoggedSubject.next(false)
          this.logOut(); 
          this.router.navigate(['/Login']);// Logout on any verification error
        }
      });

    } catch (error) {
      this.isLoggedSubject.next(false)
      this.logOut(); // If parsing fails, log the user out
      this.router.navigate(['/Login']);
    }

  }
  
  autoLogout(){
    
    // we clear the setimout function if user has log out before token expriation time arrive
    // to prevent unexpect logout calls
    this.clearLogoutTimeout() 

    const tokenExpiresIn = this.getRemainingTimeUntilTokenExpires(this.userToken!.tokenExpiresIn)
    
    this.timerFunction = setTimeout(() => {

      if(this.verifyTokenSubsrption)this.verifyTokenSubsrption.unsubscribe()
      this.logOut()
      
    }, tokenExpiresIn);
  }


  clearLogoutTimeout() {
    if (this.timerFunction) {
      clearTimeout(this.timerFunction); // Clears the timeout
      this.timerFunction = null; // Reset the timer function to avoid any unexpected calls
    }
  
  
  }
  

  storeTokenInLocalStorage(userToken: UserToken): void {
        
    localStorage.setItem('userToken', JSON.stringify(userToken));

    if(this.isAdmin) localStorage.setItem('isAdmin', JSON.stringify(true));
    

}
      

 setUserTokenToBeSeenFromAnyAppCompnt(userToken:UserToken){
     
      this.userToken = userToken
}

 deletePreviousTokenIfUserSignedBefore() {
  // Check if the token exists in localStorage
  const existingToken = localStorage.getItem('userToken');
  const existingUserName = localStorage.getItem('isAdmin')
  
  if (existingToken)  localStorage.removeItem('userToken');

  if(existingUserName)  localStorage.removeItem('isAdmin');
  
}

// Function to calculate the remaining time until the token expires
 getRemainingTimeUntilTokenExpires(tokenExpiresIn: Date): number {

  const currentTime = new Date().getTime(); // Current time in milliseconds
  const expirationTime = tokenExpiresIn.getTime(); // Token expiration time in milliseconds

  const remainingTime = expirationTime - currentTime; // Calculate the remaining time

  // If remaining time is less than or equal to 0, the token has already expired or will expire immediately
  if (remainingTime <= 0) {
    return 0; // Set it to 0 to trigger immediate logout
  }

  return remainingTime; // Return the remaining time in milliseconds
}

 checkIfUserIsAdminFromLocalStorage(): boolean {
  const checkIfUserIsAdminFromLocalStorage = localStorage.getItem('isAdmin');

  if (checkIfUserIsAdminFromLocalStorage) {
    return JSON.parse(checkIfUserIsAdminFromLocalStorage);
  } else {
    return false; // Default to false if not found in localStorage
  }
}


  }
  

