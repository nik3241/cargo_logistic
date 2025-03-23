import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'exsc-text-icons',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './text-icons.component.html',
  styleUrl: './text-icons.component.scss',
  host: { 'class': 'text-icons' }
})
export class TextIconsComponent {
  @Input() leftIcon = 'none'
  @Input() rightIcon = 'none'
}
