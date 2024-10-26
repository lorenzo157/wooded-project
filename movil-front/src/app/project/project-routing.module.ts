import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProjectsComponent } from './list-projects/list-projects.component';
import { DetailProjectComponent } from './detail-project/detail-project.component';

const routes: Routes = [
  {
    path: 'listproject',
    component: ListProjectsComponent,
  },
  { path: '', redirectTo: 'listproject', pathMatch: 'full' },
  {
    path: 'detailproject/:idProject',
    component: DetailProjectComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
