import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerificationResultComponent } from './email-verification-result.component';

const routes: Routes = [{ path: '', component: EmailVerificationResultComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailVerificationResultRoutingModule { }
