import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IRegister } from 'src/app/shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import { Router } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ICountry } from 'src/app/shared/models/general.model';
import { config } from 'src/config/config'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	register : FormGroup; 
	formSubmitted : boolean = false;
	countries : ICountry[] = [];
	yearRange : { MIN : number, MAX : number};

	constructor(
		private fb : FormBuilder,
		private auths : AuthService, 
		private ss : StateService,
		private ds : DataService,
		private router : Router
	) { 
		const currentYear = (new Date()).getFullYear();
		this.yearRange = {
			MIN : (currentYear - 100),
			MAX :  (currentYear - config.MIN_REGISTRATION_AGE)
		}

		this.register = this.generateForm()
	}

	ngOnInit(): void {
		this.getCountries();
	}

	submit() {
	
		this.formSubmitted = true;
		if(this.register.invalid) return 

		const registerDetails : IRegister = this.register.value; 
		this.auths.register(registerDetails).subscribe({
			next : (response) => {
				if(response.success) {
					this.ss.openSnackBar('registration successful');
					this.router.navigate(['/email-verification-required'])
				} else {
					this.ss.openSnackBar(response.message);
				}
			},
			error:(err) => {
				// if(err.code=="recaptcha-failed"){
				// 	this.reCaptcha.setValue(null);
				// }

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
			gndr : ['male', Validators.required],
			yob : ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(this.yearRange.MIN), Validators.max(this.yearRange.MAX)]],
			cntry : ['', Validators.required],
			prvcyPlcy : ['', Validators.required],
			reCaptcha : ['', Validators.required]
		}, {
			validators : [CustomValidators.match_pswds_validator()]
		})
	}

	getCountries() {
		this.ds.getCountries(['name']).subscribe({
			next : (response) => {
				if(response.success) {
					this.countries = response.data || [];
				} else {
					this.ss.openSnackBar(response.message)
				}
			}
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

	get yob() : AbstractControl {
		return this.register.controls['yob'];
	}

	get gndr() : AbstractControl {
		return this.register.controls['gndr']
	}

	get cntry() : AbstractControl {
		return this.register.controls['cntry']
	}

	get reCaptcha() : AbstractControl {
		return this.register.controls['reCaptcha'];
	}
}
