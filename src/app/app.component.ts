import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from "./SHARED/services/toast/toast.component";

// import { MatSlideToggleModule } from '@angular/material/slide-toggle';
@Component({
  selector: 'exsc-root',
  standalone: true,
  imports: [
  //   HttpClientModule,
  //   HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    // BrowserAnimationsModule,
    RouterOutlet,
    ToastComponent
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
