import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'activitylog',
    loadChildren: () => import('./activitylog/activitylog.module').then( m => m.ActivitylogPageModule)
  },
  {
    path: 'foodlog',
    loadChildren: () => import('./foodlog/foodlog.module').then( m => m.FoodlogPageModule)
  },
  {
    path: 'redirect',
    loadChildren: () => import('./redirect/redirect.module').then( m => m.RedirectPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
