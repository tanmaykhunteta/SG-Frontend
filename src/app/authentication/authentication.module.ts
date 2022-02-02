import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ErrorModule } from '../shared/modules/error/error.module';
import { PipesModule } from '../shared/pipes/pipes.module';
@NgModule({
  declarations: [
    AuthenticationComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    ErrorModule,
    PipesModule
  ]
})

export class AuthenticationModule { }
