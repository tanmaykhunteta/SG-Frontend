import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DisplayNewRewardComponent } from '../modules/display-new-reward/display-new-reward.component';
import { config } from 'src/config/config';
import { BehaviorSubject, distinctUntilChanged, map, Observable, of, switchMap, tap } from 'rxjs';
import { IFullUser } from '../models/user.model';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { IReward } from '../models/general.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {
    private readonly userSession$ : BehaviorSubject<IFullUser | null>;
    private userSessionObservalbe$ : Observable<IFullUser | null>

    constructor(
		private _snackBar: MatSnackBar, 
		private dialog : MatDialog,
		private ds: DataService, 
		private route: Router
	) { 
		this.userSession$ = new BehaviorSubject<IFullUser | null>(null)
		this.userSessionObservalbe$ = this.userSession$.asObservable().pipe(
			switchMap((session) => {
				if(!this.isValidSession(session)) {
					return this.fetchSessionData().pipe(tap(user => this.setSession(user as IFullUser)))
				} else {
					return of(session);
				}
			}),
		);
	}


	private get sessObj() : IFullUser | null {
		return this.userSession$.getValue()
	}

	
	/**
	 * checks user data in localStorage, if present it fetches it and then verifies if user data format is right
	 * 
	 * if data is not present or invalid it fetches user data from server via authToken
	 * @returns Promise true | false
	 */
	private fetchSessionData() : Observable<IFullUser | null> {
		if(this.ds.getFromLocal(config.ACC_TOKEN_NAME)) {
			const user : IFullUser = this.ds.getFromLocal(config.USER_DATA_NAME);
			if(!this.isValidSession(user)) {
				return this.ds.fetchSessionDataFromServer()
			}
			return of(user);
		}

		return of(null);
	}



	setSession(value : IFullUser) {
		if(!this.isValidSession(value)) return;
		const o = {...value}
		this.ds.saveToLocal(config.USER_DATA_NAME, o);
		this.userSession$.next(o);
    }  



    sessionObservable() : Observable<IFullUser | null> {
      	return this.userSessionObservalbe$
    }



	/** checks data in argument or behaviour subject is valid session or not  */
    isValidSession(session : IFullUser | null = null) : Boolean {
		const o = session || this.sessObj
      	return o?._id ? true : false
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
		const o = this.sessObj;
		if(checkFields.hasOwnProperty('em_verified') && o?.em_verified != checkFields.em_verified) 
			return false;

		return true;
    }


    logout() {
		this.ds.removeFromLocalStore(config.ACC_TOKEN_NAME);
		this.ds.removeFromLocalStore(config.USER_DATA_NAME)
		this.userSession$.next(null);
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
