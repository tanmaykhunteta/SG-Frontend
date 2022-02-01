import { Injectable } from '@angular/core';
import {
	MatSnackBar
} from '@angular/material/snack-bar';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBasicUser, IFullUser } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class StateService {
  userSession$ : BehaviorSubject<IFullUser>;
  userSessionObservalbe$ : Observable<IFullUser>
  constructor(private _snackBar: MatSnackBar) { 
    this.userSession$ = new BehaviorSubject({} as IFullUser)
    this.userSessionObservalbe$ = this.userSession$.asObservable();
  }

  sessionObservable() : Observable<IFullUser> {
    return this.userSessionObservalbe$;
  }

  setSession(value : IFullUser) {
    this.userSession$.next(value);
  }  

  openSnackBar(message : string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
	    duration : 5000
    });
  }
}
