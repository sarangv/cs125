import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {ReactiveFormsModule} from '@angular/forms';
import { UsergoalsPageRoutingModule } from './usergoals-routing.module';

import { UsergoalsPage } from './usergoals.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsergoalsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UsergoalsPage]
})
export class UsergoalsPageModule {}
