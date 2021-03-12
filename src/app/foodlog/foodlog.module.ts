import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';

import { FoodlogPageRoutingModule } from './foodlog-routing.module';

import { FoodlogPage } from './foodlog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FoodlogPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [FoodlogPage]
})
export class FoodlogPageModule {}
