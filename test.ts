
import { Component, OnInit } from '@angular/core';
import { LogoComponent } from '../../common-ui/logo/logo.component';
import { UserInputComponent } from '../../common-ui/user-input/userinput.component';
import { ButtonComponent } from '../../common-ui/button/button.component';
import { Router, RouterLink } from '@angular/router';
import { Observable, map, catchError, of, tap } from 'rxjs';
import { UsersService } from '../../shared/services/users.service';
import { User } from '../../shared/models/user.model';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { hashSync } from 'bcryptjs';
@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    LogoComponent,
    UserInputComponent,
    ButtonComponent,
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
  providers: [UsersService, AuthService],
})
export class RegistrationPageComponent implements OnInit {
  formAutorization: FormGroup;
  ngOnInit(): void {
    if (typeof document !== 'undefined') {
      document.body.style.backgroundColor = 'var(--pink-color)';
      document.body.style.display = 'flex';
    }
    // Подписка на изменения поля userpassword
    this.formAutorization.get('userpassword')?.valueChanges.subscribe(() => {
      this.formAutorization.updateValueAndValidity(); // Обновляем всю форму
    });
  }
  constructor(
    private router: Router,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    // Инициализация формы с валидацией
    this.formAutorization = new FormGroup(
      {
        username: new FormControl(null, Validators.required),
        useremail: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbiddenEmails.bind(this)
        ),
        userpassword: new FormControl(null, [
          Validators.required,
          Validators.minLength(6),
          this.passwordContainsLetterAndNumber, // Добавляем кастомный валидатор
        ]),
        confirmPassword: new FormControl(null, [Validators.required]),
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('userpassword')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    const mismatch = password !== confirmPassword;
    return mismatch ? { passwordMismatch: true } : null;
  }
  // валидатор для проверки наличия букв и цифр в пароле
  passwordContainsLetterAndNumber(
    control: AbstractControl
  ): ValidationErrors | null {
    const password = control.value;
    const hasLetter = /[a-zA-Z]/.test(password); // Проверка на наличие букв
    const hasNumber = /\d/.test(password); // Проверка на наличие цифр
    // Возвращаем ошибку, если нет букв или цифр
    return hasLetter && hasNumber ? null : { noLetterOrNumber: true };
  }
  handleButtonClick() {
    this.onSubmit();
  }
  isLoading: boolean = false;
  errorMessage: string | null = null; // Переменная для сообщения об ошибке
  onSubmit() {
    this.errorMessage = null; // Сбросить сообщение об ошибке
    // Обновляем состояние формы перед проверкой
    this.formAutorization.updateValueAndValidity();
    // Проверка на наличие ошибки passwordMismatch
    if (this.formAutorization.errors?.['passwordMismatch']) {
      this.errorMessage =
        'Пароли не совпадают.<br>Вы не заполнили корректно все поля.';
      console.log('Пароли не совпадают');
      return;
    }
    if (this.formAutorization.invalid) {
      this.errorMessage = 'Вы не заполнили корректно все поля.';
      console.log('Форма невалидна', this.formAutorization.errors);
      return;
    }
    if (!this.isLoading) {
      this.isLoading = true;
      const { username, useremail, userpassword } =
        this.formAutorization.value;
      const hashedPassword = hashSync(userpassword, 10);
      // Проверка существующего email
      this.usersService.getUserByEmail(useremail).subscribe((existingUsers) => {
        if (existingUsers.length > 0) {
          this.errorMessage = 'Пользователь с таким email уже существует!';
          this.isLoading = false;
        } else {
          const user = new User(username, useremail, hashedPassword);
          this.usersService.createNewUser(user).subscribe({
            next: (createdUser: User) => {
              window.localStorage.setItem(
                'currentUser',
                JSON.stringify(createdUser)
              );
              console.log(
                'Пользователь сохранен в локальном хранилище:',
                createdUser
              );
              this.authService.login();
              this.router.navigate(['/authorization']);
            },
            error: (err) => {
              console.error('Ошибка при регистрации:', err);
              this.errorMessage = 'Ошибка при регистрации. Попробуйте еще               раз.';
            },
            complete: () => {
              this.isLoading = false;
            },
          });
        }
      });
    }
  }
  forbiddenEmails: AsyncValidatorFn = (
    control: AbstractControl
  ): Observable<ValidationErrors | null> => {

    if (!control.value) {
      return of(null);
    }
    return this.usersService.getUserByEmail(control.value).pipe(
      map((users: User[]) => {
        if (users.length > 0) {
          return { forbiddenEmail: true }; // Возвращаем ошибку, если email уже занят
        }
        return null; // Email доступен
      }),
      catchError(() => {
        console.error('Ошибка при проверке email.');
        return of(null); // Возвращаем null, если произошла ошибка
      })
    );
  };
}
