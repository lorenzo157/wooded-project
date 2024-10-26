import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AuthModule } from '../auth/auth.module';
import { NavigationComponent } from './navigation/navigation.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, IonicModule,AuthModule],
  exports: []
})
export class SharedModule {}
