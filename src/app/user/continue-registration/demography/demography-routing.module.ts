import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemographyComponent } from './demography.component';

const routes: Routes = [{ path: '', component: DemographyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemographyRoutingModule { }
