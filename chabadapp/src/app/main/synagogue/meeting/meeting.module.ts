import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeetingPageRoutingModule } from './meeting-routing.module';

import { MeetingComponent } from './meeting.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeetingPageRoutingModule
  ],
  declarations: [MeetingComponent]
})
export class MeetingPageModule {}
