import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TemplePageRoutingModule } from './temple-routing.module';

import { TemplePage } from './temple.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TemplePageRoutingModule
  ],
  declarations: [TemplePage]
})
export class TemplePageModule {}
