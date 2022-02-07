import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/shared/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class SignInPageGuard implements CanActivate {
	constructor(private ss: StateService, private router : Router) {}

	canActivate(
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if(this.ss.isValidSession()){
			this.router.navigate(['/dashboard']);
			return false
		} else {
			return true;
		}
	}
  
}
