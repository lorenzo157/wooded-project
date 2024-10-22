import { Injectable } from '@angular/core';
import {
    AlertController,
    LoadingController,
    ToastController
} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private loading: any;

    constructor(
        public alertController: AlertController,
        public loadingController: LoadingController,
        public toastController: ToastController
    ) {}

    async alerta(
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
            backdropDismiss
        });

        await alert.present();
    }

    async cargando(isCargando: boolean = true) {
        if (isCargando && !this.loading) {
            this.loading = await this.loadingController.create({
                spinner: 'bubbles',
                message: 'Espere por favor...',
                translucent: true,
                backdropDismiss: false,
                duration: 5000
            });
            this.loading.present();
        } else {
            if (this.loading) {
                this.loading.dismiss().then(() => {
                    this.loading = null;
                });
            }
        }
    }

    async toast(
        message: string,
        color: string = 'primary',
        duration: number = 3000
    ) {
        const toast = await this.toastController.create({
            color,
            message,
            duration
        });
        toast.present();
    }
}
