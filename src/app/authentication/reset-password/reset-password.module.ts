import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './reset-password.component';

import { ErrorModule } from 'src/app/shared/modules/error/error.module';
import { MaterialModule } from 'src/app/material.module';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';



@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorModule,
    MaterialModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ResetPasswordRoutingModule
  ]
})
export class ResetPasswordModule { }
