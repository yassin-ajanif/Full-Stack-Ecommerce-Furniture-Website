import { Component, Renderer2, inject } from '@angular/core';
import { overLayService } from '../Services/overLayService.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'footer',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  overlayService = inject(overLayService);

  constructor(private renderer: Renderer2) {}

  onSubscribe(emailInput: HTMLInputElement): void {
    const email = emailInput.value;

    // Validate the email using a simple regex.
    if (!this.validateEmail(email)) {
      this.overlayService.showOverLay_Without_ConfirmationMode("Please enter a valid email address.");
      return;
    }

    // If the email is valid, show a subscription confirmation message.
    this.overlayService.showOverLay_Without_ConfirmationMode("Thank you for subscribing!");

    // Clear the input value using Renderer2 for DOM abstraction.
    this.renderer.setProperty(emailInput, 'value', '');
  }

  // Simple email validation using a regular expression.
  private validateEmail(email: string): boolean {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  }
}
