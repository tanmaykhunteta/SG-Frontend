import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IRegister } from 'src/app/shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import { Router } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	register : FormGroup = this.generateForm(); 
	formSubmitted : boolean = false;
	countries : string[] = [];

	constructor(
		private fb : FormBuilder,
		private auths : AuthService, 
		private ss : StateService,
		private ds : DataService,
		private router : Router
	) { }

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
					this.ss.openSnackBar('registration successful');
					this.router.navigate(['/user'])
				} else {
					this.ss.openSnackBar(response.message);
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
			gndr : ['male', Validators.required],
			dob : ['', Validators.required],
			country : ['', Validators.required],
			prvcyPlcy : ['', Validators.required],
			reCaptcha : ['', [Validators.required]]
		}, {
			validators : [CustomValidators.match_pswds_validator()]
		})
	}

	getCountries() {
		this.ds.getCountries().subscribe({
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
}
