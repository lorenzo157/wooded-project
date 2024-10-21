import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ListProjectsComponent } from './list-projects/list-projects.component';
import { ProjectRoutingModule } from './project-routing.module';
import { ProjectService } from './project.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ProjectRoutingModule],
  declarations: [ListProjectsComponent],
  providers: [ProjectService],
})
export class ProjectModule {}

