import { Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileLogistComponent } from './user-profile/profile-logist/profile-logist.component';
import { ProfileCarrierComponent } from './user-profile/profile-carrier/profile-carrier.component';
import { CargoLayoutComponent } from './cargo-layout/cargo-layout.component';
import { DeliveryLayoutComponent } from './delivery-layout/delivery-layout.component';
import { DeliveryListComponent } from './delivery-layout/delivery-list/delivery-list.component';
import { DeliveryCreateComponent } from './delivery-layout/delivery-create/delivery-create.component';

export const SystemRouts: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    data: { breadcrumb: 'Мой профиль' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'logist',
      },
      {
        path: 'logist',
        component: ProfileLogistComponent,
        title: 'Cargo Transportation | Профиль логиста',
        data: { breadcrumb: 'Логист' },
      },
      {
        path: 'carrier',
        component: ProfileCarrierComponent,
        title: 'Cargo Transportation | Профиль экспедитора',
        data: { breadcrumb: 'Экспедитор' },
      },
    ],
  },
  {
    path: "cargo-list",
    component: CargoLayoutComponent,
    title: "Cargo Transportation | Найти грузы",
  },
  {
    path: "delivery",
    component: DeliveryLayoutComponent,
    title: "Cargo Transportation | Доставка",
    children: [
      {
        path: 'list',
        component: DeliveryListComponent,
      },
      {
        path: "new",
        component: DeliveryCreateComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
    ]
  }
];
