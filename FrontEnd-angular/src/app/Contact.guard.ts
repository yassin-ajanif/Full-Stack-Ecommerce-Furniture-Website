// contact.guard.ts
import { CanDeactivateFn } from '@angular/router';
import { ContactPageComponent } from './Pages/Contact/contact-page/contact-page.component';

export const ContactGuard: CanDeactivateFn<ContactPageComponent> = (
  component: ContactPageComponent
) => {
  // Call the canExitPage method on the component instance
  return component.canExitPage();
};