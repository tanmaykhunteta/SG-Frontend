import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemographyRoutingModule } from './demography-routing.module';
import { DemographyComponent } from './demography.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    DemographyComponent
  ],
  imports: [
    CommonModule,
    DemographyRoutingModule,
    MaterialModule,
    
  ]
})
export class DemographyModule { }
