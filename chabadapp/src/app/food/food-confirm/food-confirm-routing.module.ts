import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodConfirmPage } from './food-confirm.page';

const routes: Routes = [
  {
    path: '',
    component: FoodConfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodConfirmPageRoutingModule {}
