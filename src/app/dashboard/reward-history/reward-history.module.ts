import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RewardHistoryRoutingModule } from './reward-history-routing.module';
import { RewardHistoryComponent } from './reward-history.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [
    RewardHistoryComponent
  ],
  imports: [
    CommonModule,
    RewardHistoryRoutingModule,
    MaterialModule
  ]
})
export class RewardHistoryModule { }
