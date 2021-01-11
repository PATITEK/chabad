import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'page-noti',
    loadChildren: () => import('./@modular/page-noti/page-noti.module').then( m => m.PageNotiModule)
  },
  {
    path: 'auth-manager',
    loadChildren: () => import('./auth-manager/auth-manager.module').then(m => m.AuthManagerPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
  },
  
  { path: '', redirectTo: 'main/synagogue/meeting', pathMatch: 'full' },
  { path: '**', redirectTo: 'main/synagogue/meeting' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
