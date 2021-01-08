import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SynagoguePageRoutingModule } from './synagogue-routing.module';

import { SynagoguePage } from './synagogue.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SynagoguePageRoutingModule
  ],
  declarations: [SynagoguePage]
})
export class SynagoguePageModule {}
