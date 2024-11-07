import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeRoutingModule } from './tree-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthModule } from '../auth/auth.module';
import { NavigationComponent } from '../shared/navigation/navigation.component';
import { TreeService } from './tree.service';
import { ListTreesComponent } from './list-trees/list-trees.component';
import { DetailTreeComponent } from './detail-tree/detail-tree.component';
import { CreateTreeComponent } from './create-tree/create-tree.component';
import { TiltMeasureComponent } from './create-tree/acelerometer.component';

@NgModule({
  declarations: [ListTreesComponent,DetailTreeComponent,CreateTreeComponent],
  imports: [
    CommonModule,
    TreeRoutingModule,
    FormsModule, IonicModule,AuthModule,NavigationComponent,ReactiveFormsModule,TiltMeasureComponent
  ],
  providers: [TreeService],
})
export class TreeModule {}