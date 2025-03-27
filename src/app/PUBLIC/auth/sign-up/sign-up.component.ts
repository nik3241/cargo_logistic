import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IUser, UserDataService } from '../../../SHARED/services/data/user-data.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../SHARED/services/auth/auth.service';
import { ToastService, toastTypes } from '../../../SHARED/services/toast/toasts.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'exsc-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    UserDataService,
    ToastService
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})

export class SignUpComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private userDataService: UserDataService,
    private authService: AuthService,
    private toastService: ToastService,
    private router: Router,
  ) {
    // console.log('SignUpComponent loaded');

    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    }, { validator: this.passwordMatchValidator });
  }
  ngOnInit() {
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')!.value === formGroup.get('repeatPassword')!.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    this.toastService.information("проверка работы");
    if (this.signupForm.valid) {
      const userData: IUser = this.signupForm.value;
      this.authService.registration({ email: userData.email, name: userData.email, password: userData.password }).subscribe(
        (response) => {
          if (response) {
            console.log('SignUpComponent response', response)
            this.toastService.success('Пользователь зарегистрирован');
            this.router.navigate(['/system']);
          }
        },
        (error) => {
          console.error('Error registering user', error);
        }
      );
    }
  }

}


