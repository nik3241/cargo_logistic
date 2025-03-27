import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastComponent } from "./SHARED/services/toast/toast.component";
import { ToastService, toastTypes } from './SHARED/services/toast/toasts.service';

@Component({
  selector: 'exsc-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
    ToastComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    // ToastService
  ]
})
export class AppComponent {

  constructor(
    private toastService: ToastService,
  ) { }

  toasterInit() {
    console.log("Успех")
    this.toastService.success('Успех');
    // console.warn("this.toastService", this.toastService.data)
  }
}
