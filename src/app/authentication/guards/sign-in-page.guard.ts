import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { StateService } from 'src/app/shared/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class SignInPageGuard implements CanActivate {
	constructor(private ss: StateService, private router : Router) {}

	canActivate(
	route: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.ss.sessionObservable().pipe(map((user) => {
			console.count('guard-sign-in')
			if(!this.ss.isValidSession(user)) {
				return true
			} else {
				this.router.navigate(['/dashboard']);
				return false;
			} 
		}))	
	}
  
}
