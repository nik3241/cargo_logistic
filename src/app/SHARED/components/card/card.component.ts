
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { ScaleAnimationDirective } from '../../directives/animations/scale-animation.directive';

@Component({
  selector: 'exsc-card',
  standalone: true,
  imports: [
    MatDividerModule
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  host: { 'class': 'card' ,
    'exscScaleAnimation':''
  },
  hostDirectives: [ScaleAnimationDirective],
})
export class CardComponent {
  @Input() headerClass = "column"
  @Input() contentClass = "column"
  @Input() footerClass = "column"
}
