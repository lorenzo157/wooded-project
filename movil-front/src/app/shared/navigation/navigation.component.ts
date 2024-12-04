import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../auth/auth.service'; // Adjust import as necessary
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { UiService } from '../ui.service';

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
      '¿Desea volver a la pantalla anterior?',
      'Confirme',
      [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.location.back(); // Navigate back if confirmed
          },
        },
      ]
    );
  }

  async logout() {
    await this.uiService.alert(
      'Confirme',
      '¿Desea salir de la aplicación?',
      [
        {
          text: 'No',
          role: 'cancel',
        },
        {
          text: 'Si',
          handler: () => {
            this.authService.logout(); // Log out if confirmed
          },
        },
      ]
    );
  }
}
