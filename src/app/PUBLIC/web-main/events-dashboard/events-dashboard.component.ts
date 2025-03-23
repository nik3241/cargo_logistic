import { Component } from '@angular/core';
import { CardEventComponent } from "../../../SHARED/components/card-event/card-event.component";

@Component({
  selector: 'exsc-events-dashboard',
  standalone: true,
  imports: [CardEventComponent],
  templateUrl: './events-dashboard.component.html',
  styleUrl: './events-dashboard.component.scss'
})
export class EventsDashboardComponent {

}
