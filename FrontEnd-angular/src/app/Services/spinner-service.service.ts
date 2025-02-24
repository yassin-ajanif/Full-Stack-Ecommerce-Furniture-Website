import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  
  public isSpinnerLoadingSubject = new Subject<boolean>(); // No initial state

  
  showSpinner(): void {
    this.isSpinnerLoadingSubject.next(true); // Notify subscribers to show spinner
  }

  hideSpinner(): void {
    this.isSpinnerLoadingSubject.next(false); // Notify subscribers to hide spinner
  }
}
