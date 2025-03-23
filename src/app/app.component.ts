import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'exsc-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    // MatSlideToggleModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
  ]
})
export class AppComponent {
  title = 'ExectScore';

  constructor(
    // private IconsService: IconsService
  ) {
  }
}
