import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { routes } from '../../../../app.routes';

@Component({
  selector: 'hero',
  imports: [RouterOutlet, RouterLink,RouterLinkActive],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {

}
