import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { APIResponse } from '../models/general.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IFullUser } from '../models/user.model';
import { config } from 'src/config/config';

@Injectable({
  providedIn: 'root'
})
export class DataService {
	storage : any = localStorage;
	baseURL : string = environment.server

	constructor(
		private http : HttpClient
	) { }

	
	fetchSessionDataFromServer() : Observable<IFullUser> {
		return this.http.get<APIResponse<IFullUser>>(this.baseURL + 'users/session-details', { withCredentials: true})
		.pipe(
			map((response) => response.data)
		)
	}

	getCountries(returnFields: string[]) : Observable<APIResponse> {
		return this.http.get<APIResponse>(this.baseURL + "countries", {params: {return : returnFields}, withCredentials: true})
	}


	saveToLocal(name : string, data : any) {
		this.storage.setItem(name, JSON.stringify(data))
	}

	
	getFromLocal(name: string) : any {
		try {
			const data = JSON.parse(this.storage.getItem(name) as string)
			return data
		} catch (error) {
			console.error(error);
			return null
		}
	}

	removeFromLocalStore(name: string) {
		localStorage.removeItem(name);
	}

	saveToSessionStore(name: string, data : any) {
		sessionStorage.setItem(name, JSON.stringify(data))
	}

	getFromSessionStore(name : string) {
		try {
			const data = JSON.parse(sessionStorage.getItem(name) as string)
			return data
		} catch (error) {
			console.error(error);
			return null
		}
	}

	removeFromSessionStore(name: string) {
		sessionStorage.removeItem(name);
	}

}
