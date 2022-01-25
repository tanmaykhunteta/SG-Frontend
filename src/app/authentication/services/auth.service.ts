import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL : string = environment.server

  constructor(private http: HttpClient) { }

  //login


  //register
}
