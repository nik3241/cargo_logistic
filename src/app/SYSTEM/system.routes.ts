import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';

export const SystemRouts: Routes = [
  {
    path: "", pathMatch: "full",
    redirectTo: "profile"
  },
  {
    path: "profile",
    component: UserProfileComponent,
    title: "Cargo Transportation | Профиль",
    data: { breadcrumb: 'Мой профиль' },
  },
];
