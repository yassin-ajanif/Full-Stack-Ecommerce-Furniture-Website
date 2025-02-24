import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy, inject, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { overLayService } from '../../Services/overLayService.service';

@Component({
  selector: 'overlay-message',
  templateUrl: './overlay-message.component.html',
  styleUrls: ['./overlay-message.component.css'],
  imports: [CommonModule]
})
export class OverlayMessageComponent implements OnInit, OnDestroy {

  message: string = "Default Message"; // Message to display
  confirmationMode: boolean = false;  // If true, shows Yes/No buttons
  isActivated: boolean = false;

  overlayService = inject(overLayService);
  renderer = inject(Renderer2);
  overlaySubscription!: Subscription; // Store subscription to unsubscribe later

  ngOnInit(): void {

    this.overlaySubscription = this.overlayService.overlayState.
    subscribe(overlayProperties => {

      this.isActivated = overlayProperties.isOverlayActivated;
      this.confirmationMode = overlayProperties.isConfirmationModeActivated;
      this.message = overlayProperties.overlayMessageBox;

      if (this.isActivated) {
        this.freezePage();
      }
       else {
        this.unfreezePage();
      }

    });

  }

  hideOverLay() {
    this.isActivated = false;
    this.unfreezePage();
  }

  closeOverlay() {
    this.hideOverLay();
  }

  // User Has Approved (clicked Yes or No)
  closeOverlayInConfirmMode(userHasApproved: boolean) {
    this.overlayService.userHasClickedYesOrNot(userHasApproved);
    this.hideOverLay();
  }

  private freezePage() {
    
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  private unfreezePage() {
    this.renderer.removeStyle(document.body, 'overflow');
  }

  ngOnDestroy(): void {
    if (this.overlaySubscription) {
      this.overlaySubscription.unsubscribe(); // Prevent memory leaks
    }
  }
}
