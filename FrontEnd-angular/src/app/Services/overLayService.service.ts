
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { ProductCategoryDTO } from '../Dtos/productCategory.dto';

@Injectable({
  providedIn: 'root',
})

export class overLayService {

   isOverlayActivated = new Subject<boolean>();
   overlayMessageBox = new Subject<string>()
   
  showOverLay_Without_ConfirmationMode(messageToShowAtBox:string){
      
    this.isOverlayActivated.next(true)
    this.overlayMessageBox.next(messageToShowAtBox)
  }

  hideOverLay(){
     this.isOverlayActivated.next(false)
  }

  showOverLay_With_ConfirmationMode_And_Return_If_YES_or_Not(messageToShowAtBox:string){
      
    this.isOverlayActivated.next(true)
    this.overlayMessageBox.next(messageToShowAtBox)
  }

}

