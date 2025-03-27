import { Injectable } from '@angular/core';
import { IMenuItem } from './menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menus: { [key: string]: IMenuItem[] } = {
    headerMenu: [
      { label: 'ПРОФИЛЬ', link: '/system/profile' },
      { label: 'Доставки', link: '/system/delivery/list' },
      { label: 'Создать доставку', link: '/system/delivery/new' },
      { label: 'Грузы', link: '/system/cargo-list' },
    ],
    userMenu: [
      { label: 'Профиль', leftIcon: 'user', link: 'profile' },
      {
        label: 'Мои мероприятия',
        leftIcon: 'calendar', rightIcon: 'empty',
        link: '#',
        children: [
          { label: 'Мои дипломы', link: '/' },
          { label: 'Мои заявки', link: '/' },
        ]
      },
    ],
    eventsSystemMenu: [
      { label: 'Общие сведения', link: '/', leftIcon: 'calendar' },
      { label: 'Заявки', link: '/', leftIcon: 'users' },
      { label: 'Соревнования', link: '/', leftIcon: 'cup' },
      {
        label: 'Управление', link: '/', leftIcon: 'settings',
        children: [
          { label: 'Основная информация', link: '/' },
          { label: 'Программы', link: '/' },
          { label: 'Оргкомитет', link: '/' },
        ]
      },
      {
        label: 'Дипломы', link: '/',
        leftIcon: 'file-text',
        children: [
          { label: 'Шаблоны', link: '/' },
          { label: 'Победителям', link: '/' },
          { label: 'За участие', link: '/' },
          { label: 'Организаторам и судьям', link: '/' },
        ]
      },
    ]
  };

  constructor() {
    // console.log(this.menus['headerMenu'][2].children)

  }


  public getMenuByName(name: string): IMenuItem[] | [] {

    return this.menus[name].length ? this.menus[name] : []
  }

}
