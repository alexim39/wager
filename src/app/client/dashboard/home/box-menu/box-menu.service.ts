import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../../../../common/server/response.interface';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject } from 'rxjs';

const httpOptions = {
    withCredentials: true,
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
}

@Injectable({
  providedIn: 'root'
})
export class BoxMenuService {
  private API_DOMAIN: string = environment.API_DOMAIN;

  //private subscriptionSource = new Subject();
  //currentSubscriptionStatus = this.subscriptionSource.asObservable();

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occured. Handle accordingly
      // console.error('An error occured:', error.error.message);
      return throwError(`Request failed due to network error, please try again`);
    } else {
      // Backend returned an unsuccessful response code.
      // The repsonse body contains clues as to what went wrong
      // console.error(`Backend error code: ${error.status}, backend message: ${error.error}`);
      return throwError(error);
    }
    // Return an observable with user-facing error msg
    // return throwError(`Something went wrong, please try again.`)
  }

  /* changeSubscription(subscriptionValue: number) {
    this.subscriptionSource.next(subscriptionValue)
    console.log(subscriptionValue)
  } */

   // deposit
   /* paystackDeposit(depositObj: DepositInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/deposit`, depositObj, httpOptions)
    .pipe(
      //retry(2), 
      catchError(this.handleError)
    );
  } */


}