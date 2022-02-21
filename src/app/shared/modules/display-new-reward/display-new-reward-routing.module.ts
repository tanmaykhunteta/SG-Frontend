import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayNewRewardComponent } from './display-new-reward.component';

const routes: Routes = [{ path: '', component: DisplayNewRewardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisplayNewRewardRoutingModule { }
