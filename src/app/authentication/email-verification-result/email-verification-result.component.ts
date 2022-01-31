import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-email-verification-result',
  templateUrl: './email-verification-result.component.html',
  styleUrls: ['./email-verification-result.component.css']
})
export class EmailVerificationResultComponent implements OnInit {
	token : string;
	message : string;
	constructor(
		private ar : ActivatedRoute, 
		private ss : StateService,
		private auth : AuthService,
		private router : Router
	) { 
		this.token = ""
		this.message = ""
	}

	ngOnInit(): void {
		this.token = this.ar.snapshot.paramMap.get('token') as string;
		this.verifyEmail();
	}

	verifyEmail() {
		this.auth.verifyEmail(this.token).subscribe({
			next : (response) => {
				if(response.success) {
					this.ss.openSnackBar(response.message);
				} else {
					this.ss.openSnackBar(response.message);
				}
			}
		}) 
	}

}
