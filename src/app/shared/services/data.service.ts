import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIResponse } from '../models/general.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  storage : any = localStorage;
  baseURL : string = environment.server

  constructor(
    private http : HttpClient
  ) { }

  getCountries() : Observable<APIResponse> {
    return this.http.get<APIResponse>(this.baseURL + "countries", {withCredentials: true})
  }

  saveToLocal(name : string, data : any) {
    this.storage.setItem(name, JSON.stringify(data))
  }

  getFromLocal(name: string) : any {
    return JSON.parse(this.storage.getItem(name) as string)
  }
}
