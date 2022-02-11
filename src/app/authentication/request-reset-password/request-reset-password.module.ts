import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestResetPasswordRoutingModule } from './request-reset-password-routing.module';
import { RequestResetPasswordComponent } from './request-reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorModule } from 'src/app/shared/modules/error/error.module';
import { MaterialModule } from 'src/app/material.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';




@NgModule({
  declarations: [
    RequestResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorModule,
    MaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    RequestResetPasswordRoutingModule
  ]
})
export class RequestResetPasswordModule { }
