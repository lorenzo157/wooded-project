import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  private isLoading: any;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {}

  async alert(
    message: string,
    header: string = 'Atención',
    buttons: any = ['Aceptar'],
    backdropDismiss: boolean = true,
    cssClass = ''
  ) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons,
      cssClass,
      backdropDismiss,
    });

    await alert.present();
  }

  async loading() {
    if (!this.isLoading) {
      this.isLoading = await this.loadingController.create({
        spinner: 'bubbles',
        message: 'Espere por favor...',
        translucent: true,
        backdropDismiss: false,
        duration: 2000,
      });
      this.isLoading.present();
    } else {
      this.isLoading.dismiss().then(() => {
        this.isLoading = null;
      });
    }
  }

  async toast(message: string, color: string = 'primary', duration: number = 3000) {
    const toast = await this.toastController.create({
      color,
      message,
      duration,
    });
    toast.present();
  }
}
