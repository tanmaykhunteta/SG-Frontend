import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IRegister } from 'src/app/shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { CustomErrors, CustomValidators } from 'src/app/shared/validators/custom.validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	register : FormGroup = this.generateForm(); 
	formSubmitted : boolean = false;
	constructor(private fb : FormBuilder, private auths : AuthService) { }

	ngOnInit(): void {
	}

	resolved(event : string) {
		console.log(event);
	}

	submit() {
		this.formSubmitted = true;
		if(this.register.invalid) {
			return 
		}

		const registerDetails : IRegister = this.register.value; 
		this.auths.register(registerDetails).subscribe({
			next : (response) => {
				if(response.success) {
					alert('registration successful');
				} else {
					alert(response.message);
				}
			}
		})
	}

	generateForm() : FormGroup {
		return this.fb.group({
			fn : ['', [Validators.required]],
			ln : ['', [Validators.required]],
			email : ['', [Validators.required, Validators.email]],
			pswd : ['', [Validators.required, CustomValidators.password_pattern()]],
			cnfm_pswd : ['', [Validators.required]],
			reCaptcha : ['', [Validators.required]]
		}, {
			validators : [CustomValidators.match_pswds_validator()]
		})
	}


	get fn() : AbstractControl {
		return this.register.controls['fn']
	}

	get ln() : AbstractControl {
		return this.register.controls['ln']
	}

	get email() : AbstractControl {
		return this.register.controls['email'];
	}

	get pswd() : AbstractControl {
		return this.register.controls['pswd'];
	}

	get cnfm_pswd() : AbstractControl {
		return this.register.controls['cnfm_pswd']
	}
}
