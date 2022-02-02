import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ErrorModule } from 'src/app/shared/modules/error/error.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    ErrorModule,
    PipesModule
  ]
})
export class LoginModule { }
