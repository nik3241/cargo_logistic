import { Injectable } from '@angular/core';

import { CanActivate, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuth = false;

  constructor() { }

  getStatus() {
    return this.isAuth
  }

  isLoggedIn(): boolean {
    // Здесь должна быть логика проверки авторизации, например, проверка токена в localStorage
    return !!localStorage.getItem('authToken');
  }

  login() {
    // Логика входа пользователя
    localStorage.setItem('authToken', 'dummyToken');
  }

  logout() {
    // Логика выхода пользователя
    localStorage.removeItem('authToken');
  }

  registration() {

  }
}


