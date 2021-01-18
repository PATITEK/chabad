import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'synagogue',
        loadChildren: () => import('./synagogue/synagogue.module').then(m => m.SynagoguePageModule)
      },
      {
        path: 'near-you',
        loadChildren: () => import('./near-you/near-you.module').then(m => m.NearYouPageModule)
      },
      {
        path: 'shopping',
        loadChildren: () => import('./shopping/shopping.module').then(m => m.ShoppingPageModule)
      },
      {
        path: 'event',
        loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
      },
    ]
  },
  {
    path: '',
    redirectTo: 'main/synagogue',
    pathMatch: 'full'
  },
  {
    path: 'food',
    loadChildren: () => import('./food/food.module').then( m => m.FoodPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule { }
