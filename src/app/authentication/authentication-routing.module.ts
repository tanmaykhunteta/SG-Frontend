import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [{ path: '', component: AuthenticationComponent, children: [

  {path : 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
] },
{ path: 'email-verification-failed', loadChildren: () => import('./email-verification-result/email-verification-result.module').then(m => m.EmailVerificationResultModule) }];
];

 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
