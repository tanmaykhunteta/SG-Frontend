import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, children : []},
  { path: 'registration/continue', loadChildren: () => import('./continue-registration/continue-registration.module').then(m => m.ContinueRegistrationModule) },
  { path: 'reward-history', loadChildren: () => import('./reward-history/reward-history.module').then(m => m.RewardHistoryModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
