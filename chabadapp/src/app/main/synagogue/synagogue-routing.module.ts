import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SynagoguePage } from './synagogue.page';

const routes: Routes = [
  {
    path: '',
    component: SynagoguePage
  },
  {
    path: 'meeting',
    loadChildren: () => import('./meeting/meeting.module').then(m => m.MeetingPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SynagoguePageRoutingModule {}
