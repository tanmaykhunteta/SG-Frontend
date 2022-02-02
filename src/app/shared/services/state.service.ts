import { Injectable } from '@angular/core';
import {
	MatSnackBar
} from '@angular/material/snack-bar';
import { config } from 'src/config/config';
import { BehaviorSubject, Observable, of, takeUntil } from 'rxjs';
import { IBasicUser, IFullUser } from '../models/user.model';
import { DataService } from './data.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class StateService {
    private userSession$ : BehaviorSubject<IFullUser>;
    userSessionObservalbe$ : Observable<IFullUser>
    private sessionObj : IFullUser = {} as IFullUser;

    constructor(private _snackBar: MatSnackBar, private ds: DataService, private route: Router) { 
		this.userSession$ = new BehaviorSubject({} as IFullUser)
		this.userSessionObservalbe$ = this.userSession$.asObservable();
    }

    sessionObservable() : Observable<IFullUser> {
      	return this.userSessionObservalbe$;
    }

    setSession(value : IFullUser) {
		this.ds.saveToSessionStore(config.USER_DATA_NAME, value);
		this.sessionObj = value;
		this.userSession$.next(value);
    }  

    isLoggedIn() : Boolean {
      	return this.sessionObj?._id ? true : false
    }


    matchAuthorizationValue(checkFields : {em_verified? : boolean}) : Boolean {
		console.log(typeof this.sessionObj.em_verified + " " + typeof checkFields.em_verified)
		if(checkFields.hasOwnProperty('em_verified') && this.sessionObj.em_verified != checkFields.em_verified) 
			return false;

		return true;
    }


    fetchSessionData() : any{
		if(this.ds.getFromLocal(config.ACC_TOKEN_NAME)) {
			const user : IFullUser = this.ds.getFromSessionStore(config.USER_DATA_NAME);
			if(!user || !(user instanceof Object)) {
				return this.ds.fetchSessionDataFromServer().subscribe((user) => this.setSession(user));
			}

			return this.setSession(user)
		}
    }


    logout() {
		this.ds.removeFromLocalStore(config.ACC_TOKEN_NAME);
		this.ds.removeFromSessionStore(config.USER_DATA_NAME)
		this.setSession({} as IFullUser)
		this.route.navigate(['/'])
    }

    openSnackBar(message : string) {
		this._snackBar.open(message, 'close', {
			horizontalPosition: 'center',
			verticalPosition: 'top',
			duration : 5000
		});
    }
}
