import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StateService } from 'src/app/shared/services/state.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})

export class VerifyEmailComponent implements OnInit {
	success : boolean = false;
	message : string = "";
	isChecked : boolean = false;

	constructor(
		private auth : AuthService, 
		private ar: ActivatedRoute,
		private ss : StateService,
		private cdr : ChangeDetectorRef
	) { 
		const token : string | null = this.ar.snapshot.queryParamMap.get("token");
		if(!token) {
			this.setStatus(false, "Token not found")
			return
		}
		this.verifyEmail(token);
	}

	ngOnInit(): void {}


	setStatus(success: boolean, message: string) : void {
		this.isChecked = true;
		this.success = success
		this.message = message;
	}

	
	verifyEmail(token : string) {
		this.auth.verifyEmail(token)
		.subscribe({
			next : (response)=>{
				this.setStatus(response.success, response.message)
				if(response.success)
					this.ss.displayReward({type: "em_verified"})
				this.cdr.markForCheck()
			}
		})
	}

}
