import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';

const routes: Routes = [{ path: '', component: UserComponent, children : [
    {path: '', redirectTo: 'registration/continue', pathMatch : 'full'},
    {path: 'registration/continue', loadChildren: () => import('./continue-registration/continue-registration.module').then(m => m.ContinueRegistrationModule) },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
