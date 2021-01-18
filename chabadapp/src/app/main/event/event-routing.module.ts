import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventDetailComponent} from './detail/event-detail.component'
import { EventPage } from './event.page';

const routes: Routes = [
  {
    path: '',
    component: EventPage
  },
  {
    path: 'detail',
    component: EventPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventPageRoutingModule {}
