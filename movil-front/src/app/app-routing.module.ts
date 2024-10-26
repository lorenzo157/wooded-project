import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'project',
    loadChildren: () =>
      import('./project/project.module').then((m) => m.ProjectModule),
      canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'project',
    pathMatch: 'full',
  },
  {
    path: 'project/:idProject/tree',
    loadChildren: () =>
      import('./tree/tree.module').then((m) => m.TreeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
