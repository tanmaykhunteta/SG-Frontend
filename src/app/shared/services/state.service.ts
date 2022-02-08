import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DisplayNewRewardComponent } from '../modules/display-new-reward/display-new-reward.component';
import { config } from 'src/config/config';
import { BehaviorSubject, Observable, of, takeUntil } from 'rxjs';
import { IFullUser } from '../models/user.model';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { IReward } from '../models/general.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {
    private userSession$ : BehaviorSubject<IFullUser>;
    userSessionObservalbe$ : Observable<IFullUser>
    private sessionObj : IFullUser = {} as IFullUser;

    constructor(
		private _snackBar: MatSnackBar, 
		private dialog : MatDialog,
		private ds: DataService, 
		private route: Router
	) { 
		this.userSession$ = new BehaviorSubject({} as IFullUser)
		this.userSessionObservalbe$ = this.userSession$.asObservable();
    }

    sessionObservable() : Observable<IFullUser> {
      	return this.userSessionObservalbe$;
    }


    setSession(value : IFullUser) {
		const _ = {...value}
		this.ds.saveToLocal(config.USER_DATA_NAME, _);
		this.sessionObj = _;
		this.userSession$.next(_);
    }  


    isValidSession(session : IFullUser | null = null) : Boolean {
		const _ = session || this.sessionObj
      	return _?._id ? true : false
    }


	/**
	 * matches (key : value passed) in checkFields with key value of user session
	 * 
	 * it return true if values matches else false
	 * 
	 * used for checking different kind of authorizations.
	 * 
	 * if multiple key: values are passed in checkFields, it returns false for the first occurance of unmatched values
	 * 
	 * @param checkFields
	 * @returns 
	 */
    matchAuthorizationValue(checkFields : {em_verified? : boolean}) : Boolean {
		if(checkFields.hasOwnProperty('em_verified') && this.sessionObj.em_verified != checkFields.em_verified) 
			return false;

		//multiple key: values check goes here (in future);
		return true;
    }


	/**
	 * checks user data in sessionStore, if present it fetches it and then verifies if user data format is right
	 * 
	 * if data is not present or invalid it fetches user data from server via authToken
	 * @returns void
	 */
    fetchSessionData() : void {
		if(this.ds.getFromLocal(config.ACC_TOKEN_NAME)) {
			const user : IFullUser = this.ds.getFromLocal(config.USER_DATA_NAME);
			if(!this.isValidSession(user)) {
				this.ds.fetchSessionDataFromServer().subscribe(
					(user) => {
						if(user)
							this.setSession(user)
					}
				);
				return
			}
			this.setSession(user)
		}
    }


    logout() {
		this.ds.removeFromLocalStore(config.ACC_TOKEN_NAME);
		this.ds.removeFromLocalStore(config.USER_DATA_NAME)
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


	displayReward(data : IReward) {
		this.dialog.open(DisplayNewRewardComponent, {data});
	}
}
