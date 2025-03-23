import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EventsDashboardComponent } from './events-dashboard/events-dashboard.component';

export const webMainRouts: Routes = [
  {
    path: "", pathMatch: "full",
    component: HomePageComponent,
    title: "ExectScore | Главная",
  },
  {
    path: "events",
    component: EventsDashboardComponent,
    title: "ExectScore | Мероприятия",
  }
];
