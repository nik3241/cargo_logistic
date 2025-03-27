import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from "@angular/common";
import { MenuService } from '../menus/menu.service';
import { MenuHeaderComponent } from '../menus/menu-header/menu-header.component';
import { AuthService } from '../../services/auth/auth.service';
import { IUser } from '../../services/data/user-data.service';
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
  protected isAuthenticated = false
  protected user: IUser | null = null;

  menuName: string = 'headerMenu'
  menuItems

  constructor(
    private menuService: MenuService,
    protected authService: AuthService,
  ) {
    this.menuItems = this.menuService.getMenuByName(this.menuName);
    this.isAuthenticated = this.authService.isLoggedIn()
    this.authService.user.subscribe(user => this.user = user)
  }
}
