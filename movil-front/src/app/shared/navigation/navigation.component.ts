import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { AuthService } from '../../auth/auth.service'; // Adjust import as necessary
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],  // Add necessary modules
})

export class NavigationComponent {

  constructor(private location: Location, private authService: AuthService) {}

  // Navigate back to the previous page
  goBack() {
    this.location.back();
  }

  // Handle user logout
  logout() {
    this.authService.logout();
  }
}
