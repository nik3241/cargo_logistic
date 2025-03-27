import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserDataService } from '../../../SHARED/services/data/user-data.service';
import { AuthService } from '../../../SHARED/services/auth/auth.service';
import { ToastService, toastTypes } from '../../../SHARED/services/toast/toasts.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'exsc-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [UserDataService],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signinForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private userDataService: UserDataService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.signinForm.valid) {
      const userData = this.signinForm.value;
      const isSuccess = this.authService.authorization(userData.email, userData.password)

      this.toastService.success(`Пользователь авторизован ${isSuccess}`)

    }

  }
}
