import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivitylogPageRoutingModule } from './activitylog-routing.module';

import { ActivitylogPage } from './activitylog.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActivitylogPageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [ActivitylogPage]
})
export class ActivitylogPageModule {}
