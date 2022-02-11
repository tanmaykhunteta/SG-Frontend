import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILogin } from 'src/app/shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
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

  	// resolved(event : string) {
	// 	this.sendTokenToBackend(event);
	// }

	// sendTokenToBackend(token: string){
	// 	this.auths.sendToken(token).subscribe(
	// 		res => {
	// 			console.log(res);
	// 		},
	// 		err => {
	// 			console.log(err);
	// 		}

	// 	);


  submit() {
		this.formSubmitted = true;
		if(this.loginForm.invalid) {
			return 
		}

		const loginDetails : ILogin = this.loginForm.value; 
		this.auths.login(loginDetails).subscribe({
			next : (response) => {
				if(response.success) {
					this.router.navigate(['/dashboard'])
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
			reCaptcha : ['', [Validators.required]],
		})
	}

  	get email() : AbstractControl {
		return this.loginForm.controls['email'];
	}

	get pswd() : AbstractControl {
		return this.loginForm.controls['pswd'];
	}

	get reCaptcha() : AbstractControl {
		return this.loginForm.controls['reCaptcha'];
	}
}
