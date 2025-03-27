import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum toastTypes {
  error,
  warning,
  success,
  information
}

export interface ToastData {
  title: string;
  content: string;
  show?: boolean;
  type?: toastTypes;
  progressWidth?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  data!: ToastData;
  public $toast = new Subject<ToastData>();

  initiate(data: ToastData) {
    this.data = { ...data, show: true, progressWidth: '100%' };
    console.log("new toastInit this.data", this.data)
    this.$toast.next(this.data);
  }

  hide() {
    this.data = { ...this.data, show: false };
    this.$toast.next(this.data);
  }

  error(content = "") {
    const toastConfig = { content, title: "Ошибка", } as ToastData
    this.initiate(toastConfig)
  }
  warning(content = "") {
    const toastConfig = { content, title: "Предупреждение", } as ToastData
    this.initiate(toastConfig)
  }
  success(content = "") {

    const toastConfig = { content, title: "Успех", } as ToastData
    this.initiate(toastConfig)
  }
  information(content = "") {
    const toastConfig = { content, title: "Информация", } as ToastData
    this.initiate(toastConfig)
  }


}
