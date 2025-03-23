import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { HeaderComponent } from '../../SHARED/header/header.component';
// import { MenuService } from '../../SHARED/menus/menu.service';
// import { MenuSystemComponent } from '../../SHARED/menus/menu-system/menu-system.component';
import { BreadcrumbComponent } from "../../SHARED/components/breadcrumb/breadcrumb.component";
import { HeaderComponent } from '../../SHARED/components/header/header.component';
import { MenuSystemComponent } from '../../SHARED/components/menus/menu-system/menu-system.component';
import { MenuService } from '../../SHARED/components/menus/menu.service';

@Component({
  selector: 'exsc-system-main',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    MenuSystemComponent,
    BreadcrumbComponent
],
  templateUrl: './system-main.component.html',
  styleUrl: './system-main.component.scss'
})
export class SystemMainComponent {
  userMenuItems;
  eventsSystemMenuItems;
  constructor(private menuService: MenuService) {
    this.userMenuItems = this.menuService.getMenuByName('userMenu');
    this.eventsSystemMenuItems = this.menuService.getMenuByName('eventsSystemMenu');
  }

}
