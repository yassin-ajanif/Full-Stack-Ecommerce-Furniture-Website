import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { SpinnerService } from '../../Services/spinner-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'full-page-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './full-page-spinner.component.html',
  styleUrls: ['./full-page-spinner.component.css']
})
export class FullPageSpinnerComponent implements OnInit, OnDestroy {

  isLoading: boolean = false; 
  spinnerSubscription!: Subscription;  

  constructor(private spinnerService: SpinnerService, private renderer: Renderer2) {}

  ngOnInit(): void {
    // Subscribe to the spinner service
    this.spinnerSubscription = this.spinnerService.isSpinnerLoadingSubject.subscribe(
      (loading) => { 
        this.isLoading = loading;
        if (loading) {
          this.freezePage();
        } else {
          this.unfreezePage();
        }
      }
    );
  }

  
  ngOnDestroy(): void {
    this.spinnerSubscription.unsubscribe(); // Prevent memory leaks
    this.unfreezePage(); // Ensure page unfreezes when component is destroyed
  }

  private freezePage() {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  private unfreezePage() {
    this.renderer.removeStyle(document.body, 'overflow'); // Re-enable scrolling
  }
}
