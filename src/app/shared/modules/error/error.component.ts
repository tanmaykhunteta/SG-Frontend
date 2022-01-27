import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CustomErrors } from '../../validators/custom.validators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {
	@Input() 
		control : AbstractControl = {} as AbstractControl;

    @Input() 
        showOnSubmit : boolean = false;

    @Input()
        submitted : boolean = false;

    @Input()
        patternText : string = ''

    customErrors = CustomErrors
	constructor() { }

}
