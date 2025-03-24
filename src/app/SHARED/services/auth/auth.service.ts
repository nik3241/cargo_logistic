import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';
import { IUser, UserDataService } from '../data/user-data.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastService, toastTypes } from '../toast/toasts.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Инициализируем статус авторизации
  private isAuth = false;

  // Инициализируем BehaviorSubject с начальным значением null
  private _user = new BehaviorSubject<IUser | null>(null);
  // URL вашего JSON-сервера
  private apiUrl = 'http://localhost:3000/users';

  constructor(
    // private http: HttpClient,
    private userDataService: UserDataService,
    private toastService: ToastService
  ) {
    this.checkAuthentication();
  }

  // Метод для получения текущего пользователя
  user(): Observable<IUser | null> {
    return this._user.asObservable();
  }




  private checkAuthentication() {
    if (typeof window !== 'undefined') {
      const storedUser = window.localStorage.getItem('currentUser');
      if (storedUser) {
        // Пользователь найден, выполняем вход
        this.login(JSON.parse(storedUser));
      }
    }
  }



  isLoggedIn(): boolean {
    return this.isAuth;
  }


  login(user: IUser) {
    if (user && user.password !== undefined) {
      // Убираем пароль из данных пользователя перед сохранением
      const { password, ...userWithoutPassword } = user;
      this.isAuth = true;
      this._user.next(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
      this.toastService.initiate({ content: "Пользователь авторизован", title: "Автоизация", type: toastTypes.success })

    } else {
      this.toastService
        .initiate({ content: "Ошибка в данных пользователя", title: "Автоизация", type: toastTypes.error })

      console.error('Invalid user data:', user);
    }
  }


  logout() {
    this.isAuth = false
    // Логика выхода пользователя
    this._user.next(null)
    if (typeof window !== 'undefined') {
      // Удалить пользователя из локального хранилища
      window.localStorage.removeItem('currentUser');
    }
  }
  // Логика регистрации пользователя
  registration(userData: IUser): Observable<IUser | null> {
    return this.userDataService.registerUser(userData)

  }
}


