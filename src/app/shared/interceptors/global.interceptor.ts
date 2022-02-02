import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpEventType
} from '@angular/common/http';

import { DataService } from '../services/data.service';

import { catchError, map, Observable, throwError } from 'rxjs';
import { config } from 'src/config/config'
import { StateService } from '../services/state.service';
import { Router } from '@angular/router';

@Injectable()
export class GlobalInterceptor implements HttpInterceptor {
	
  constructor(
	private ds : DataService, 
	private ss : StateService,
	) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
	if(request.withCredentials && this.ds.getFromLocal(config.ACC_TOKEN_NAME)) {
		request = request.clone({headers : request.headers.set(config.ACC_TKN_HDR, this.ds.getFromLocal(config.ACC_TOKEN_NAME) as string)})
	}
	const url = request.method + " : " + request.url;
	const reqDetails = request

	return next.handle(request).pipe(
		map((res : HttpEvent<any>)=> {
			if(res.type == HttpEventType.Sent) {
				console.log("======================== STARTS")
				console.log("REQUEST SENT : " + url)
				console.log("REQUEST DETAIL : ", reqDetails)
				console.log("======================== ENDS")
			}
			if(res.type == HttpEventType.Response) {
				console.log("======================== STARTS")
				console.log("RESPONSE : " + url)
				console.log("REQUEST DETAIL : ", reqDetails)
				console.log("RESPONSE DETAIL : ", res)
				console.log("======================== ENDS")

				console.log(res.headers);
				if(res.headers.get(config.ACC_TKN_HDR)) {
					this.ds.saveToLocal('authToken', res.headers.get(config.ACC_TKN_HDR) as string)
				}
			}

			return res
		}),
		
		catchError((error: HttpErrorResponse) => {
			let errorMsg = '';
			if (error.error instanceof ErrorEvent) {
				console.log('This is client side error');
				errorMsg = `Error: ${error.error.message}`;
			} else {
				console.log('This is server side error');
				// errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
				errorMsg = error.error.message || error.message
			}
			console.log("======================= STARTS")
			console.log("ERROR RESPONSE : " + url)
			console.log("REQUEST DETAIL : ", reqDetails)
			console.log("ERROR : ", error);
			console.log("====================== ENDS")
			this.ss.openSnackBar(errorMsg)
			if(error.status == 401) {
				this.ss.logout();
			}
			return throwError(() => errorMsg);
		})
    );
  }
}
