import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../auth/auth.service'; // Adjust import as necessary
import { IonicModule } from '@ionic/angular';
import { UiService } from 'src/app/utils/ui.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule], // Add necessary modules
})
export class NavigationComponent {
  constructor(
    private location: Location,
    private authService: AuthService,
    private uiService: UiService
  ) {}

  // Navigate back to the previous page
  async goBack() {
    await this.uiService.alert(
      '¿Volver a la pantalla anterior?',
      '',
      [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.location.back(); // Navigate back if confirmed
          },
        },
      ]
    );
  }

  async logout() {
    await this.uiService.alert(
      '¿Salir de la aplicación?',
      '',
      [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.authService.logout(); // Log out if confirmed
          },
        },
      ]
    );
  }
}
