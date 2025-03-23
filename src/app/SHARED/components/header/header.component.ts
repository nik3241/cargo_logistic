import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from "@angular/common";
import { MenuService } from '../menus/menu.service';
import { MenuHeaderComponent } from '../menus/menu-header/menu-header.component';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'exsc-header',
  standalone: true,
  imports: [
    MenuHeaderComponent,
    RouterLink,
    NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [AuthService],
})
export class HeaderComponent {
  @Input() isPublic = true

  protected userImageSrc = ""
  protected userName = "Jon Doe"
  menuName: string = 'headerMenu'
  menuItems

  constructor(private menuService: MenuService) {
    this.menuItems = this.menuService.getMenuByName(this.menuName);
  }
}
