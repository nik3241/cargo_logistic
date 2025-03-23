import { Component, Input, OnInit } from '@angular/core';
import { IMenuItem } from '../menu.model';
import { RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MenuService } from '../menu.service';

@Component({
  selector: 'exsc-menu-header',
  standalone: true,
  templateUrl: './menu-header.component.html',
  styleUrls: ['./menu-header.component.scss'],
  imports: [
    RouterLink,
    NgFor,
    NgClass,
    NgIf],
})
export class MenuHeaderComponent implements OnInit {
  @Input() items: IMenuItem[] = [];


  headerMenu
  
  constructor(private menuService: MenuService) {
    this.headerMenu = this.menuService.getMenuByName('headerMenu');


  }
  ngOnInit(): void {
    // Здесь вы можете использовать значение name
  }

}

