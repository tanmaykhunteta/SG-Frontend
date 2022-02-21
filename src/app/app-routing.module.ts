import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from './dashboard/guards/dashboard.guard';

const routes: Routes = [
  { path: '', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'dashboard', canLoad: [DashboardGuard], canActivate: [DashboardGuard], loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
