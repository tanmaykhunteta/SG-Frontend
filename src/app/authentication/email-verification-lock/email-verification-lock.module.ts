import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailVerificationLockRoutingModule } from './email-verification-lock-routing.module';
import { EmailVerificationLockComponent } from './email-verification-lock.component';


@NgModule({
  declarations: [
    EmailVerificationLockComponent
  ],
  imports: [
    CommonModule,
    EmailVerificationLockRoutingModule
  ]
})
export class EmailVerificationLockModule { }
