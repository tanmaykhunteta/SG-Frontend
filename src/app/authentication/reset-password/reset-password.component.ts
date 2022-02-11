import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';




@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  resetPswd : FormGroup; 
	formSubmitted : boolean = false;
  token : string | null ='';
  msg:string='';
  tokenExpired : boolean = true;

  constructor(
    private fb : FormBuilder,
		private auths : AuthService, 
		private ss : StateService,
		private ar: ActivatedRoute,
		private router : Router
  ) { 
    this.resetPswd = this.generateForm()
  }
    

  ngOnInit(): void {
    this.token=this.ar.snapshot.queryParamMap.get('token') as string;
    if(!this.token)
      return
    this.auths.verifyToken(this.token).subscribe({
      next: (response) => {
        console.log(response);
        if(response.success){
          this.tokenExpired = false;
        }
      }
    })
  }


  submit() {
	
		this.formSubmitted = true;
		if(this.resetPswd.invalid) return
    console.log(this.resetPswd.value); 
		this.auths.resetPassword(this.resetPswd.value).subscribe({
			next : (response) => {
				if(response.success) {
					this.ss.openSnackBar('Password reset successful');
					this.router.navigate(['/login'])
				} else {
					this.ss.openSnackBar(response.message);
          this.msg = response.message;
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
			pswd : ['', [Validators.required, CustomValidators.password_pattern()]],
			cnfm_pswd : ['', [Validators.required]],
      token : this.ar.snapshot.queryParamMap.get('token'),
      reCaptcha : ['', Validators.required]
		}, {
			validators : [CustomValidators.match_pswds_validator()]
		})
	}


  get pswd() : AbstractControl {
		return this.resetPswd.controls['pswd'];
	}

	get cnfm_pswd() : AbstractControl {
		return this.resetPswd.controls['cnfm_pswd']
	}

  get reCaptcha() : AbstractControl {
		return this.resetPswd.controls['reCaptcha'];
	}

}
