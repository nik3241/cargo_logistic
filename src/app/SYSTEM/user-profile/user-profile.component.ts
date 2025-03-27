import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CardComponent } from "../../SHARED/components/card/card.component";
import { TextIconsComponent } from "../../SHARED/components/text-icons/text-icons.component";
import { AccordionComponent } from "../../SHARED/components/accordion/accordion.component";
import { AuthService } from '../../SHARED/services/auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IUser } from '../../SHARED/services/data/user-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'exsc-user-profile',
  standalone: true,
  imports: [
    MatDividerModule,
    CommonModule,
    RouterOutlet,
    CardComponent,
    TextIconsComponent
],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit, OnDestroy {

  profileInfo: IUser | null = null
  private $strems: Array<Subscription> = []

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.$strems.push(this.authService.user.subscribe((user) => this.profileInfo = user || null))

  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }

  ngOnDestroy(): void {
    if (this.$strems.length)
      this.$strems.forEach((strem) => strem.unsubscribe())
  }
}
