import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailVerificationResultRoutingModule } from './email-verification-result-routing.module';
import { EmailVerificationResultComponent } from './email-verification-result.component';


@NgModule({
  declarations: [
    EmailVerificationResultComponent
  ],
  imports: [
    CommonModule,
    EmailVerificationResultRoutingModule
  ]
})
export class EmailVerificationResultModule { }
