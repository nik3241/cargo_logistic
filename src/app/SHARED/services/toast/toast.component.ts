import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { ToastService } from './toasts.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'exsc-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  imports: [
    CommonModule,
  ],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          visibility: 'hidden',
          right: '-400px',
        })
      ),
      state(
        'open',
        style({
          right: '40px',
        })
      ),
      transition('open <=> closed', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class ToastComponent implements OnInit {

  @ViewChild('element', { static: false })
  progressBar!: ElementRef;
  protected _timer: ReturnType<typeof setTimeout> | undefined;

  constructor(
    private elem: ElementRef,
    private renderer: Renderer2,
    public toastService: ToastService
  ) {
    this.toastService.open.subscribe((data) => {
      if (data.show) {
        console.log('ToastComponent constructor', data)
        this.countDown();
      }
    });
  }

  ngOnInit() { }

  countDown() {
    console.warn('countDown this.toastService.data', this.toastService.data)

    this.progressBar.nativeElement.style.width =
      this.toastService.data.progressWidth;

    this._timer = setInterval(() => {
      const width = parseInt(this.progressBar.nativeElement.style.width, 10);

      console.log(width)
      if (width <= 0) {
        this.toastService.hide();
        clearInterval(this._timer);
        return;
      }

      this.toastService.data.progressWidth = String(width - 2);
      // this.renderer.setStyle(this.progressBar.nativeElement, "width", this.toastService.data.progressWidth + '%')
      this.progressBar.nativeElement.style.width =
        this.toastService.data.progressWidth + '%';
    }, 150);
  }

  stopCountDown() {
    // Очищаем таймер, если он установлен
    if (this._timer !== undefined) {
      clearInterval(this._timer);
      this._timer = undefined; // Сбрасываем таймер после очистки
    }
  }
}
