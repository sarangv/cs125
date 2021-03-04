import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsergoalsPage } from './usergoals.page';

const routes: Routes = [
  {
    path: '',
    component: UsergoalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsergoalsPageRoutingModule {}
