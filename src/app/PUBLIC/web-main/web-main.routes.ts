import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';

export const webMainRouts: Routes = [
  {
    path: "", pathMatch: "full",
    component: HomePageComponent,
    title: "Cargo Transportation | Главная",
  },
];
