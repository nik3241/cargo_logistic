import { Component } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MenuService } from '../menu.service';


import { MatDividerModule } from '@angular/material/divider';
import { RouterLink } from '@angular/router';
import { TextIconsComponent } from '../../text-icons/text-icons.component';
// import { TextIconsComponent } from "../../components/text-icons/text-icons.component";

@Component({
  selector: 'exsc-menu-system',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    NgFor,
    NgIf,
    RouterLink,
    MatDividerModule,
    TextIconsComponent
],
  templateUrl: './menu-system.component.html',
  styleUrl: './menu-system.component.scss'
})
export class MenuSystemComponent {

  userMenu
  eventsSystemMenu

  constructor(private menuService: MenuService) {
    this.userMenu = this.menuService.getMenuByName('userMenu');
    this.eventsSystemMenu = this.menuService.getMenuByName('eventsSystemMenu');
  }

}
