import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit,inject } from '@angular/core';
import { overLayService } from '../../Services/overLayService.service';

@Component({
  selector: 'overlay-message',
  templateUrl: './overlay-message.component.html',
  styleUrls: ['./overlay-message.component.css'],
  imports :[CommonModule]
})
export class OverlayMessageComponent implements OnInit{
  
  
   message: string = "Default Message"; // Message to display
   confirmationMode: boolean = false;  // If true, shows Yes/No buttons
   isActivated : boolean = false;

   overlayService = inject(overLayService)


  ngOnInit(): void {
    
      this.overlayService.isOverlayActivated.subscribe(data=>{
         
          this.isActivated = data
      })

      this.overlayService.overlayMessageBox.subscribe(data=>{
         
        this.message = data })
  }


  closeOverlay(){

    this.overlayService.hideOverLay()
  }

  // user Has Approved it means clicked ok or yes
  closeOverlayInConfirmMode(userHasApproved:boolean){
   
  } 

}
