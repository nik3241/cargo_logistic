import { Injectable } from '@angular/core';

export interface IUserProfile {
  id?: string | number;
  name?: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private userProfile!: IUserProfile

  constructor() {
    console.log('UserProfileService initialized');
  }

  // Метод для установки данных пользователя
  setUserProfile(user: IUserProfile): void {
    this.userProfile = user;
  }

  // Метод для получения данных пользователя
  getUserProfile(): IUserProfile | null {
    return this.userProfile;
  }

  // Метод для очистки данных пользователя (например, при выходе из системы)
  // clearUserProfile(): void {
  //   this.userProfile = null;
  // }
}
