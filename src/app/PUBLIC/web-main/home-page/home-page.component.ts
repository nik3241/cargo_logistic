import { Component } from '@angular/core';
import { CardComponent } from "../../../SHARED/components/card/card.component";
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { CardEventComponent } from "../../../SHARED/components/card-event/card-event.component";
import { GrabbingScrollDirective } from '../../../SHARED/directives/grabbing-scroll.directive';

@Component({
  selector: 'exsc-home-page',
  standalone: true,
  imports: [
    NgFor,
    GrabbingScrollDirective,
    CardComponent,
    RouterLink,
    CardEventComponent
],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {arrayOfNumbers = Array.from({ length: 12 }, (_, i) => i);

}
