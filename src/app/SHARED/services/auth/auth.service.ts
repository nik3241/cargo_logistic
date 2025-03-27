import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { IUser, UserDataService } from '../data/user-data.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService, toastTypes } from '../toast/toasts.service';
import { consumerDestroy } from '@angular/core/primitives/signals';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Инициализируем статус авторизации
  private isAuth = false;

  // Инициализируем BehaviorSubject с начальным значением null
  private _user = new BehaviorSubject<IUser | null>(null);

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private toastService: ToastService
  ) {
    this.checkAuthentication();
  }

  // Метод для получения текущего пользователя
  user = this._user.asObservable();


  private checkAuthentication() {
    if (typeof window !== 'undefined') {
      const storedUser = window.localStorage.getItem('currentUser');
      if (storedUser) {
        // Пользователь найден, выполняем вход
        const userObj = JSON.parse(storedUser)
        // this.login(userObj.email, userObj.password);
        this.login(userObj)
      }
    }
  }

  isLoggedIn(): boolean {
    return this.isAuth;
  }

  authorization(email: string, password: string) {
    const response = this.userDataService.getUserByEmail(email)
      .subscribe((item) => {
        if (item?.password === password) {
          this.login({ ...item })
          return true
        }
        return false
      })
  }

  login(user: IUser) {
    this.isAuth = true;
    this._user.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.toastService.success("Пользователь авторизован")

    this.router.navigate(["/system"])
    // if (typeof response)

    // subscribe(
    //   response => {
    //     if (response) {
    //       this.toastService.initiate({
    //         title: "Успех",
    //         content: "Пользователь авторизован",
    //         type: toastTypes.success,
    //       })
    //       this.authService.login(response)
    //       this.router.navigate(["/system"])
    //       return
    //     }
    //     this.toastService.initiate({
    //       title: "Ошибка",
    //       content: "Пользователь с таким email уже существует",
    //       type: toastTypes.error,
    //     })
    //   },
    //   error => {
    //     console.error('Error registering user', error);
    //   }
    // );


    // if (user && user.password !== undefined) {
    //   // Убираем пароль из данных пользователя перед сохранением
    //   const { password, ...userWithoutPassword } = user;
    //   this.isAuth = true;
    //   this._user.next(userWithoutPassword);
    //   localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    //   this.toastService.initiate({ content: "Пользователь авторизован", title: "Автоизация", type: toastTypes.success })
    //   return true
    // } else {
    //   this.toastService
    //     .initiate({
    //       content: "Ошибка в данных пользователя",
    //       title: "Автоизация",
    //       type: toastTypes.error
    //     })
    //   return false
    // }
  }


  logout() {
    this.isAuth = false
    // Логика выхода пользователя
    this._user.next(null)

    // Удалить пользователя из локального хранилища
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('currentUser');
    }

    this.router.navigate(['/'])
  }

  // Логика регистрации пользователя
  registration(userData: IUser): Observable<IUser | null> {
    return this.userDataService.registerUser(userData)
  }
}


