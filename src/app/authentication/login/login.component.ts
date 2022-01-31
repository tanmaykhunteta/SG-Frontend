import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ILogin, IRegister } from 'src/app/shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { CustomErrors, CustomValidators } from 'src/app/shared/validators/custom.validators';
import { Router } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup = this.generateForm(); 
	formSubmitted : boolean = false;
	constructor(
		private fb : FormBuilder, 
		private auths : AuthService, 
		private ss : StateService,
		private router : Router  
		) { }

	ngOnInit(): void {
	}

  	resolved(event : string) {
		console.log(event);
	}

  submit() {
		this.formSubmitted = true;
		if(this.loginForm.invalid) {
			return 
		}

		const loginDetails : ILogin = this.loginForm.value; 
		this.auths.login(loginDetails).subscribe({
			next : (response) => {
				if(response.success) {
					this.router.navigate(['/user'])
					this.ss.openSnackBar('Login successful');
				} else {
					this.ss.openSnackBar(response.message);
				}
			}
		})
	}

  	generateForm() : FormGroup {
		return this.fb.group({
			email : ['', [Validators.required, Validators.email]],
			pswd : ['', [Validators.required, CustomValidators.password_pattern()]],
			reCaptcha : ['', [Validators.required]]
		})
	}

  	get email() : AbstractControl {
		return this.loginForm.controls['email'];
	}

	get pswd() : AbstractControl {
		return this.loginForm.controls['pswd'];
	}

}
