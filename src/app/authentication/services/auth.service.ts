import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRegister, ILogin } from 'src/app/shared/models/user.model';
import { Observable, tap } from 'rxjs';
import { APIResponse } from 'src/app/shared/models/general.model';
import { StateService } from 'src/app/shared/services/state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  	baseURL : string = environment.server

	constructor(
		private http: HttpClient,
		private ss : StateService
	) { }

	login(userData : ILogin) : Observable<APIResponse> {
		return this.http.post<APIResponse>(this.baseURL + 'users/login', userData, {withCredentials : true})
		.pipe(
			tap((response) => {
				if(response.success && response.data?.auth)
					this.ss.setSession(response.data.auth);
			})
		)
	}
	

	register(userData : IRegister) : Observable<APIResponse> {
		return this.http.post<APIResponse>(this.baseURL + 'users/register', userData, {withCredentials : true})
		.pipe(
			tap((response) => {
				if(response.success && response.data?.auth) {
					this.ss.setSession(response.data.auth)
				}
			})
		)
	}


	verifyEmail(token : string) : Observable<APIResponse> {
		return this.http.put<APIResponse>(this.baseURL + "users/verify-email", {token}, {withCredentials: true})
		.pipe(
			tap((response) => {
				if(response.success && response.data?.auth) {
					this.ss.setSession(response.data?.auth);
				}
			})
		)
	}

}
