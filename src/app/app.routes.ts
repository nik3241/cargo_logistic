import { Routes } from '@angular/router';
import { authRouts } from './PUBLIC/auth/auth.routes';
import { SystemRouts } from './SYSTEM/system.routes';
import { webMainRouts } from './PUBLIC/web-main/web-main.routes';
import { AuthGuard } from './SHARED/services/auth/auth.guard';
import { AuthComponent } from './PUBLIC/auth/auth.component';
import { WebMainComponent } from './PUBLIC/web-main/web-main.component';
import { SystemMainComponent } from './SYSTEM/system-main/system-main.component';

export const routes: Routes = [
  {
    path: "",
    component: WebMainComponent,
    title: "Cargo Transportation | Главная",
    data: {
      breadcrumb: 'Главная'
    },
    children: webMainRouts,
  },
  {
    path: 'login',
    component: AuthComponent,
    children: authRouts
  },
  {
    path: 'system',
    component: SystemMainComponent,
    canActivate: [AuthGuard],
    data: {
      breadcrumb: 'Система'
    },
    children: SystemRouts
  }

];
