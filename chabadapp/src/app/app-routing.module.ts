import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth-manager',
    loadChildren: () => import('./auth-manager/auth-manager.module').then(m => m.AuthManagerPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
  },
  {
    path: 'donate',
    loadChildren: () => import('./donate/donate.module').then( m => m.DonatePageModule)
  },
<<<<<<< HEAD
=======
  {
    path: 'page-noti',
    loadChildren: () => import('../app/@modular/page-noti/page-noti-routing.module').then( m=>m.PageNotiRoutingModule)
  },
>>>>>>> 7e2c12916d64b30e5a4e0da32ae72bdecbdfcd15
  { path: '', redirectTo: 'main/synagogue', pathMatch: 'full' },
  { path: '**', redirectTo: 'main/synagogue' },
  // {
  //   path: 'people',
  //   loadChildren: () => import('./main/synagogue/people/people.module').then( m => m.PeoplePageModule)
  // },



 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
