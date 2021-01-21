import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FoodConfirmPageRoutingModule } from './food-confirm-routing.module';

import { FoodConfirmPage } from './food-confirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodConfirmPageRoutingModule
  ],
  declarations: [FoodConfirmPage]
})
export class FoodConfirmPageModule {}
