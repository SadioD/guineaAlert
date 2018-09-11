import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: ''                ,  redirectTo:   'home'         , pathMatch: 'full' },
  { path: 'authentification',  component:    AuthComponent },
  { path: 'home'    ,          loadChildren: './app-view/home/home.module#HomePageModule' },
  { path: 'settings',          loadChildren: './app-view/settings/settings.module#SettingsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
