import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

export interface IUser {
  [key: string]: any;
  id?: number | string | null;
  name?: string,
  email: string,
  password?: string
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  // URL JSON-сервера
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {
    this.getUser("qwerty@mail.ru", "123123").subscribe((items) => console.log("UserDataService this.getUser", items))
  }

  getUser(email: string, password: string): Observable<IUser[]> {
    // Пример запроса для получения пользователя по email и password
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${email}&password=${password}`);
  }


  getUserByEmail(email: string): Observable<IUser | null> {
    return this.http.get<IUser[]>(`${this.apiUrl}?email=${email}`).pipe(
      map((users: IUser[]) => (users.length > 0 ? users[0] : null))
    );
  }

  public isUserExists(email: string): Observable<boolean> {
    return this.getUserByEmail(email).pipe(
      map((user: IUser | null) => user !== null)
    );
  }


  public registerUser(userData: IUser): Observable<IUser | null> {
    return this.isUserExists(userData.email)
      .pipe(
        switchMap((exists: boolean) => {
          if (exists) {
            // Если пользователь существует, возвращаем null
            return new Observable<null>((observer) => {
              observer.next(null);
              observer.complete();
            });
          } else {
            // Если пользователь не существует, регистрируем нового пользователя
            return this.http.post<IUser>(this.apiUrl, userData)
          }
        })

      );
  }

  public authenticateUser(email: string, password: string): IUser | Error {
    this.getUserByEmail(email).subscribe(items => {
      console.log('getUserByEmail items', items)
    })
    return new Error("Пользователь не авторизован")
  }
}
