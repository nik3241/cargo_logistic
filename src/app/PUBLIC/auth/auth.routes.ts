import { Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const authRouts: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login/signin" },
  {
    path: "signin",
    component: SignInComponent,
    title: "Cargo Transportation | Вход",
  },
  {
    path: "signup",
    component: SignUpComponent,
    title: "Cargo Transportation | Регистрация",
  }
];
