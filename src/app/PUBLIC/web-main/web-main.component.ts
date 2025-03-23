import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../SHARED/components/header/header.component';
import { FooterComponent } from '../../SHARED/components/footer/footer.component';

@Component({
  selector: 'exsc-web-main',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './web-main.component.html',
  styleUrl: './web-main.component.scss'
})
export class WebMainComponent {

}
