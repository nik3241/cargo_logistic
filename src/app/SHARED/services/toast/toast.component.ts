import { ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ToastService, ToastData } from './toasts.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'exsc-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('openClose', [
      state('closed', style({ visibility: 'hidden', right: '40px' })),
      state('open', style({ right: '40px' })),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ]),
  ],
})

export class ToastComponent {
  @ViewChild('element', { static: false }) progressBar!: ElementRef;
  private $currentToast: Subscription;
  protected _timer: ReturnType<typeof setTimeout> | undefined;

  constructor(
    public toastService: ToastService,
  ) {

    // Инициализация данных при старте компонента
    this.$currentToast = this.toastService.$toast.subscribe((data: ToastData) => {
      if (data.show) {
        this.countDown();
      }
    });
  }

  ngOnDestroy(): void {
    this.$currentToast.unsubscribe();
  }

  countDown() {
    this.progressBar.nativeElement.style.width = this.toastService.data.progressWidth;

    this._timer = setInterval(() => {
      let width = parseInt(this.progressBar.nativeElement.style.width, 10);

      if (width <= 0) {
        this.stopCountDown()
        return;
      }

      this.toastService.data.progressWidth = String(width - 2);
      this.progressBar.nativeElement.style.width = this.toastService.data.progressWidth + '%';
    }, 150);
  }

  stopCountDown() {
    if (this._timer !== undefined) {
      this.toastService.hide();
      clearInterval(this._timer);
      this._timer = undefined;
    }
  }
}
