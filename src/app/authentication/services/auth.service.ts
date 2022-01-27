import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IRegister } from 'src/app/shared/models/user.model';
import { Observable } from 'rxjs';
import { APIResponse } from 'src/app/shared/models/general.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL : string = environment.server

  constructor(private http: HttpClient) { }

  //login


  //register
  register(userData : IRegister) : Observable<APIResponse> {
    return this.http.post<APIResponse>(this.baseURL + 'users/register', userData, {withCredentials : true})
  }
}
