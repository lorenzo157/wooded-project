import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailTreeComponent } from './detail-tree/detail-tree.component';
import { ListTreesComponent } from './list-trees/list-trees.component';
import { CreateTreeComponent } from './create-tree/create-tree.component';

const routes: Routes = [
  {
    path: ':projectType/listtree',
    component: ListTreesComponent,
  },
  { path: '', redirectTo: 'listtree', pathMatch: 'full' },
  {
    path: ':projectType/detailtree/:idTree',
    component: DetailTreeComponent,
  },
  {
    path: ':projectType/createtree/:idTree',
    component: CreateTreeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreeRoutingModule { }
