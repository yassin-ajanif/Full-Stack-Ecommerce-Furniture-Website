import { AfterViewChecked, Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { ShoppingCartComponent } from "./Components/shopping-cart/shopping-cart.component";
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthServiceService } from '../Services/auth-service.service';
import { cartService } from '../Services/cartService.service';

@Component({
  selector: 'navbar',
  imports: [CommonModule,ShoppingCartComponent,
    RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent  {
 
  cartVisible: boolean = false;  // Initially, the cart is hidden
  authService = inject(AuthServiceService)
  cartService = inject(cartService)

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent): void {
    // If click happens outside of the navbar, close the mobile menu.
    if (!this._eref.nativeElement.contains(event.target)) {
      this.mobileMenuVisible = false;
    }
  }

  constructor(private renderer:Renderer2 , private _eref: ElementRef){}

  mobileMenuVisible: boolean = false;

  toggleMenu(): void {
    this.mobileMenuVisible = !this.mobileMenuVisible;
  }
  // Function to toggle the cart visibility
  DisplayCart(): void {
    this.cartVisible = true;
    this.applyOverlay();
  }

  closeCart(): void {
    this.cartVisible = false;
    this.removeOverlay();
  }

  private applyOverlay(): void {
    this.renderer.addClass(document.body, 'overlay-active'); // Add overlay background
    this.disableScrolling()
  }

  private removeOverlay(): void {
    this.renderer.removeClass(document.body, 'overlay-active'); // Remove overlay background
    this.enableScrolling()
  }

  private disableScrolling(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  private enableScrolling(): void {
    this.renderer.removeStyle(document.body, 'overflow');
  }

}
