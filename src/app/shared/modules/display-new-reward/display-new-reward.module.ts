import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisplayNewRewardRoutingModule } from './display-new-reward-routing.module';
import { DisplayNewRewardComponent } from './display-new-reward.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    DisplayNewRewardComponent
  ],
  imports: [
    CommonModule,
    DisplayNewRewardRoutingModule,
    MatDialogModule
  ],
  exports : [
    DisplayNewRewardComponent
  ]
})
export class DisplayNewRewardModule { }
