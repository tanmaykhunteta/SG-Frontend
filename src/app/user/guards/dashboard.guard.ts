import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { StateService } from 'src/app/shared/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate, CanLoad {
    constructor(
		private ss : StateService, 
		private router: Router
	) {}

    canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.verifyAuth()
    }

	canLoad(
	route: Route, 
	segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
		return this.verifyAuth()
	}
  
	verifyAuth() : boolean {
		if(this.ss.isLoggedIn()) {
			if(this.ss.matchAuthorizationValue({em_verified : false})) {
				this.router.navigate(['/email-verification-required'])
				return false
			}
			return true;
		}

		this.router.navigate(['/login']);
		return false;
	}
}
