import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IUser {
  id?: string | number,
  name?: string,
  email: string,
  password?: string
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  private apiUrl = 'http://localhost:3000/users'; // URL вашего JSON-сервера

  constructor(private http: HttpClient) { }

  getUser(email: string, password: string): Observable<IUser> {
    // Пример запроса для получения пользователя по email и password
    return this.http.get<IUser>(`${this.apiUrl}?email=${email}&password=${password}`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
