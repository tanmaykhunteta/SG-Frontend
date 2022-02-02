import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SignInPageGuard } from './guards/sign-in-page.guard';
import { EmailVerificationGuard } from './guards/email-verification.guard';


const routes: Routes = [{ path: '', component: AuthenticationComponent, children: [
    {path: '', redirectTo: "login", pathMatch: 'full'},
    {path : 'register', canActivate :[SignInPageGuard] ,component: RegisterComponent},
    {path: 'login',  canActivate :[SignInPageGuard] , component: LoginComponent},
  ]},
  {path: 'email-verification-required', canActivate: [EmailVerificationGuard], loadChildren: () => import('./email-verification-lock/email-verification-lock.module').then(m => m.EmailVerificationLockModule) },
  { path: 'verify-email', loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailModule) },
];


 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
