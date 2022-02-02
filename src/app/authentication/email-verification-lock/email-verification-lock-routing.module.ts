import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailVerificationLockComponent } from './email-verification-lock.component';

const routes: Routes = [{ path: '', component: EmailVerificationLockComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailVerificationLockRoutingModule { }
