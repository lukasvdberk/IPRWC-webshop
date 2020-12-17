import { Injectable, TemplateRef  } from '@angular/core';


interface ToastOptions {
  message: string;
  durationInSeconds: number;
  toastClass?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: any[] = [];
  showError(options: ToastOptions): void {
    if (options.toastClass === undefined) {
      options.toastClass = 'bg-danger text-light';
    }
    this.show(options);
  }

  showSuccess(options: ToastOptions): void {
    if (options.toastClass === undefined) {
      options.toastClass = 'bg-success';
    }
    this.show(options);
  }

  // Push new Toasts to array with content and options
  private show(options: ToastOptions): void {
    this.toasts.push({
      classname: options.toastClass,
      delay: options.durationInSeconds * 1000,
      autohide: true,
      headertext: options.message,
    });
  }

  // Callback method to remove Toast DOM element from view
  remove(toast: any): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
