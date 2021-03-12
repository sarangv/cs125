import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FoodlogPage } from './foodlog.page';

const routes: Routes = [
  {
    path: '',
    component: FoodlogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FoodlogPageRoutingModule {}
