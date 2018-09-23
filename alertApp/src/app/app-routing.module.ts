import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
    { path: ''                      , redirectTo:   'home'           ,  pathMatch: 'full' },
    { path: 'home'                  , canActivate: [AuthGuardService],  loadChildren: './app-view/home/home.module#HomePageModule' },
    { path: 'settings'              , canActivate: [AuthGuardService],  loadChildren: './app-view/all-settings/settings/settings.module#SettingsPageModule' },
    { path: 'settings/pac-list'     , canActivate: [AuthGuardService],  loadChildren: './app-view/all-settings/pac/pac-list/pac-list.module#PacListPageModule' },
    { path: 'settings/pac-list/:id' , canActivate: [AuthGuardService],  loadChildren: './app-view/all-settings/pac/pac-set/pac-set.module#PacSetPageModule' },
    { path: 'authentification'      ,                                   loadChildren: './auth/auth.module#AuthPageModule' },
    { path: 'logOut'                , canActivate: [AuthGuardService],  loadChildren: './log-out/log-out.module#LogOutPageModule' },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
