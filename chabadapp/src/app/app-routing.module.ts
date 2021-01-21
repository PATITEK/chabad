import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './@app-core/auth-guard.service';

const routes: Routes = [
  {
    path: 'auth-manager',
    loadChildren: () => import('./auth-manager/auth-manager.module').then(m => m.AuthManagerPageModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainPageModule)
    ,canActivate : [AuthGuard],
  },
  {
    path: 'donate',
    loadChildren: () => import('./donate/donate.module').then( m => m.DonatePageModule)
    ,canActivate : [AuthGuard],
  },
  {
    path: 'pray',
    loadChildren: () => import('./pray/pray.module').then( m => m.PrayPageModule)
    ,canActivate : [AuthGuard],
  },
  {
    path: 'page-noti',
    loadChildren: () => import('../app/@modular/page-noti/page-noti-routing.module').then( m=>m.PageNotiRoutingModule)
    ,canActivate : [AuthGuard],
  },
  {
    path: 'service',
    loadChildren: () => import('./service/service.module').then( m => m.ServicePageModule)
    ,canActivate : [AuthGuard],
  },
  {
    path: 'chabad',
    loadChildren: () => import('./chabad/chabad.module').then( m => m.ChabadPageModule)
    ,canActivate : [AuthGuard],
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
    ,canActivate : [AuthGuard],
  },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then( m => m.FoodPageModule)
    ,canActivate : [AuthGuard],
  },
  { path: '', redirectTo: 'main/chabad', pathMatch: 'full' },
  { path: '**', redirectTo: 'main/chabad' },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
