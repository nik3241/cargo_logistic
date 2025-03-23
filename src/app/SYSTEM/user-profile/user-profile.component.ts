import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CardComponent } from "../../SHARED/components/card/card.component";
import { TextIconsComponent } from "../../SHARED/components/text-icons/text-icons.component";
import { AccordionComponent } from "../../SHARED/components/accordion/accordion.component";


@Component({
  selector: 'exsc-user-profile',
  standalone: true,
  imports: [
    MatDividerModule,
    CardComponent,
    TextIconsComponent,
    AccordionComponent
],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent {
  userInfo: { [key: string]: string } = {}
  constructor() {
    setTimeout(() => {
      this.userInfo={
        userId: "USR-69774",
        email:"agafonovazxc@gmail.com",
        SNILS:"СНИЛС | ",
        tel:"+79307026275",
        datebirth:"14.04.2000",
        adress:"Россия, Нижегородская область, г. Нижний Новгород",
        timeoffset:"Московское время \ UTC +3",
        gender:"Мужской",
        bodysize:"M",
      }
    }, 2000)
  }
}
