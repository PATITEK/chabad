import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SynagoguePage } from './synagogue.page';

const routes: Routes = [
  {
    path: '',
    component: SynagoguePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SynagoguePageRoutingModule {}
