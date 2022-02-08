import { Component, HostListener } from '@angular/core';
import { config } from 'src/config/config';
import { IFullUser } from './shared/models/user.model';
import { DataService } from './shared/services/data.service';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Survey Gravity';
	signedIn : boolean = false
	user : IFullUser | null = null;

	constructor(
		private ss: StateService, 
	) {
		this.ss.fetchSessionData();
		this.watchSession();
	}


	watchSession() {
		this.ss.sessionObservable().subscribe((user) => {
			if(this.ss.isValidSession()) {
				this.signedIn = true;
				this.user = user
			} else {
				this.signedIn = false
				this.user = null
			}
		})
	}


	/**
	 * checks for accessToken change on other tabs
	 */
	@HostListener('window:storage', ['$event'])
	watchForSessionChange(event : StorageEvent) {
		if(event.key == config.ACC_TOKEN_NAME) {
			if(event.newValue != event.oldValue) {
				location.href = '/'
			}
		}
	}
	

	logout() {
		this.ss.logout();
	}
}
