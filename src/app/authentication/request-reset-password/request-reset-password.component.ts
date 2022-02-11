import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CustomValidators } from 'src/app/shared/validators/custom.validators';
import { Router } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';


@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent implements OnInit {

  resetForm : FormGroup = this.generateForm(); 
	formSubmitted : boolean = false;
  constructor( 
    private fb : FormBuilder, 
		private auths : AuthService, 
		private ss : StateService,
		private router : Router) { }

  
  submit() {
      this.formSubmitted = true;
      if(this.resetForm.invalid) {
        return 
      }
  
      const resetDetails = this.resetForm.value;
      console.log(resetDetails); 
      this.auths.requestResetPswd(resetDetails).subscribe({
        next : (response) => {
          if(response.success) {
            // this.router.navigate(['/dashboard'])
            // this.ss.openSnackBar('Login successful');
          } else {
            this.ss.openSnackBar(response.message);
          }
        }
      })
  }

  ngOnInit(): void {
  }

  generateForm() : FormGroup {
		return this.fb.group({
			email : ['', [Validators.required, Validators.email]],
      reCaptcha : ['', Validators.required],
		})
	}

  get email() : AbstractControl {
		return this.resetForm.controls['email'];
	}

  get reCaptcha() : AbstractControl {
		return this.resetForm.controls['reCaptcha'];
	}

}
