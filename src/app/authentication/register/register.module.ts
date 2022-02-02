import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { ErrorModule } from 'src/app/shared/modules/error/error.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    ErrorModule,
    PipesModule
  ]
})
export class RegisterModule { }
