import { Component } from '@angular/core';
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
			if(this.ss.isLoggedIn()) {
				this.signedIn = true;
			} else {
				this.signedIn = false
			}
		})
	}

	
	logout() {
		this.ss.logout();
	}
}
