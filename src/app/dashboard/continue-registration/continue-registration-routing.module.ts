import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContinueRegistrationComponent } from './continue-registration.component';

const routes: Routes = [{ path: '', component: ContinueRegistrationComponent, children : [
  {path: '', redirectTo : "basic-demography", pathMatch: 'full'},
  { path: 'basic-demography', loadChildren: () => import('./demography/demography.module').then(m => m.DemographyModule) }
]}] 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContinueRegistrationRoutingModule { }
