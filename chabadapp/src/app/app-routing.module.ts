import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthManagerPage } from './auth-manager/auth-manager.page';

const routes: Routes = [
  
  {
    path: 'main/auth-manager',
    loadChildren: () => import('./auth-manager/auth-manager.module').then( m => m.AuthManagerPageModule)
  },
  {
    path: 'main/page-noti',
    loadChildren: () => import('./page-noti/page-noti-routing.module').then( m => m.PageNotiRoutingModule)
  },
  { path: '', redirectTo: 'main/auth-manager', pathMatch: 'full' },
  { path: '**', redirectTo: 'main/auth-manager' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
