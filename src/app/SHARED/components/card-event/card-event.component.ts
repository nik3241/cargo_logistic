import { Component, Input } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'exsc-card-event',
  standalone: true,
  imports: [
    CardComponent,
    RouterLink
  ],
  templateUrl: './card-event.component.html',
  styleUrl: './card-event.component.scss'
})
export class CardEventComponent {
  @Input() eventItem = {
    _id: 358343,
    name: "Чемпионат России по авиамодельному спорту в классах моделей F5B, F3K, F5J",
    nameShort: 'Чемпионат России в классах моделей F5B, F3K, F5J',
    description: "Краткое текстовое описание. Аннотация к соревнованиям. Краткое текстовое описание. Аннотация к соревнованиям. Краткое текстовое описание. Аннотация к соревнованиям",
    urlImg: '',
    place: 'Стадион Олимпийский, Набережная Челны',

  }
}
