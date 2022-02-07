import { Component, HostListener } from '@angular/core';
import { config } from 'src/config/config';
import { DataService } from './shared/services/data.service';
import { StateService } from './shared/services/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'frontend';
	signedIn : boolean = false

	constructor(private ss: StateService, private ds : DataService) {
		this.ss.fetchSessionData();
		this.watchSession();
	}


	watchSession() {
		this.ss.sessionObservable().subscribe((user) => {
			if(this.ss.isValidSession()) {
				this.signedIn = true;
			} else {
				this.signedIn = false
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
				location.reload()
			}
		}
	}

	
	logout() {
		this.ss.logout();
	}
}
