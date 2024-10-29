import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTreeComponent } from './detail-tree/detail-tree.component';
import { ListTreesComponent } from './list-trees/list-trees.component';
import { CreateTreeComponent } from './create-tree/create-tree.component';

const routes: Routes = [
  {
    path: 'listtree',
    component: ListTreesComponent,
  },
  { path: '', redirectTo: 'listtree', pathMatch: 'full' },
  {
    path: 'detailtree/:idTree',
    component: DetailTreeComponent,
  },
  {
    path: 'createtree/:projectType',
    component: CreateTreeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeRoutingModule { }
