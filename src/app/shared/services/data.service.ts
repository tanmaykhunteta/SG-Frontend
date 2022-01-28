import { Injectable } from '@angular/core';
import {
	MatSnackBar
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message : string) {
    this._snackBar.open(message, 'close', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
	    duration : 5000
    });
  }
}
