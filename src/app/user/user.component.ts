import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IFullUser } from '../shared/models/user.model';
import { StateService } from '../shared/services/state.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
	session : IFullUser = {} as IFullUser;
	unsub$ : Subject<boolean> = new Subject();

	constructor(
		private ss : StateService
	) { 
		this.watchSession();
	}

	ngOnInit(): void {
		
	}

	watchSession() : void {
		this.ss.sessionObservable().pipe(takeUntil(this.unsub$)).subscribe((session) => {
			if(this.ss.isLoggedIn()) {
				this.session = session;
			}
		})
	}
	

	ngOnDestroy(): void {
		this.unsub$.next(false);
		this.unsub$.complete();
	}
}
