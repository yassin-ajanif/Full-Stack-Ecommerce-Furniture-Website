
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { ProductCategoryDTO } from '../Dtos/productCategory.dto';

interface OverlayProperties {
  isOverlayActivated: boolean;
  overlayMessageBox: string;
  isConfirmationModeActivated: boolean; 
}

@Injectable({
  providedIn: 'root',
})

export class overLayService {

  
   overlayState = new Subject<OverlayProperties>

   userHasClickedYesOrNot! : (value:boolean) => void

  showOverLay_Without_ConfirmationMode(messageToShowAtBox:string){
      
    this.overlayState.next
    ({isOverlayActivated:true,
      overlayMessageBox:messageToShowAtBox,
      isConfirmationModeActivated:false})
    
  }

  getUserConfirmation_Yes_Or_Not(): Promise<boolean> {
    
    return new Promise((resolve) => {
        
       this.userHasClickedYesOrNot = resolve
       
    });
    }

  showOverLay_With_ConfirmationMode_And_Return_If_YES_or_Not(messageToShowAtBox:string)
  :Promise<boolean>{
      
    this.overlayState.next
    ({isOverlayActivated:true,
      overlayMessageBox:messageToShowAtBox,
      isConfirmationModeActivated:true})

    return this.getUserConfirmation_Yes_Or_Not()

  }

}

