import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IFullUser } from 'src/app/shared/models/user.model';
import { StateService } from 'src/app/shared/services/state.service';
import { constants } from 'src/config/constants';

@Component({
  selector: 'app-email-verification-lock',
  templateUrl: './email-verification-lock.component.html',
  styleUrls: ['./email-verification-lock.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class EmailVerificationLockComponent implements OnInit {
	userSession$ : Observable<IFullUser | null> | null = null
	rewardAmount : number = constants.REWARD.em_verified.amount;

	constructor(private ss : StateService) { }

	ngOnInit(): void {
		this.userSession$ = this.ss.sessionObservable()
	}
}
