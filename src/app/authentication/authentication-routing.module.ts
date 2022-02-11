import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageGuard } from './guards/sign-in-page.guard';
import { EmailVerificationGuard } from './guards/email-verification-lock.guard';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch : "full"},
  { path: 'email-verification-required', canLoad : [EmailVerificationGuard], canActivate: [EmailVerificationGuard], loadChildren: () => import('./email-verification-lock/email-verification-lock.module').then(m => m.EmailVerificationLockModule) },
  { path: 'verify-email', loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
  { path: 'register', canActivate: [SignInPageGuard], loadChildren: () => import('./register/register.module').then(m => m.RegisterModule) },
  { path: 'login', canActivate: [SignInPageGuard], loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  {path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordModule)},
  {path: 'request-reset-password', loadChildren: () => import('./request-reset-password/request-reset-password.module').then(m => m.RequestResetPasswordModule)}
];


 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
