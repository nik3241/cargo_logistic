import { Component } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CardComponent } from '../../../SHARED/components/card/card.component';
import { TextIconsComponent } from '../../../SHARED/components/text-icons/text-icons.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { IUser } from '../../../SHARED/services/data/user-data.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../SHARED/services/auth/auth.service';

@Component({
  selector: 'app-user-profile-logist',
  imports: [
    MatDividerModule,
    CardComponent,
    TextIconsComponent,
    CommonModule,
  ],
  templateUrl: './profile-logist.component.html',
  styleUrl: './profile-logist.component.scss'
})
export class ProfileLogistComponent {
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
