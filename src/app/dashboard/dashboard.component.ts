import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { IFullUser } from '../shared/models/user.model';
import { StateService } from '../shared/services/state.service';

@Component({
  selector: 'app-user',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
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
			if(this.ss.isValidSession()) {
				this.session = session;
			}
		})
	}
	

	ngOnDestroy(): void {
		this.unsub$.next(false);
		this.unsub$.complete();
	}
}
