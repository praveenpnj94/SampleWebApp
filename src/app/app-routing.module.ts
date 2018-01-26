/*
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
*/

import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './components/common/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './components/common/layouts/auth-layout/auth-layout.component';

import { AuthGuard } from './services/auth/auth.guard';
import { NotFoundComponent } from './views/unavailable/not-found.component';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'signin',
        loadChildren: './views/signin/signin.module#SigninModule',
        data: { title: 'Signin'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        loadChildren: './views/profile/profile.module#ProfileModule',
        data: { title: 'Profile'}
      },
      {
        path: 'settings',
        loadChildren: './views/account/settings.module#SettingsModule',
        data: { title: 'Account Settings'}
      }
    ]
  },
  {
    path:'404',
    component:NotFoundComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'**',
    redirectTo:'404'
  }
];




