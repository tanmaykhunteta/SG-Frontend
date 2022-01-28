import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContinueRegistrationRoutingModule } from './continue-registration-routing.module';
import { ContinueRegistrationComponent } from './continue-registration.component';


@NgModule({
  declarations: [
    ContinueRegistrationComponent
  ],
  imports: [
    CommonModule,
    ContinueRegistrationRoutingModule
  ]
})
export class ContinueRegistrationModule { }
