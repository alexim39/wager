import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../../../common/server/response.interface';
import { environment } from 'src/environments/environment';
import { UserInterface } from 'src/app/core/user.service';

export interface UserBetcodesAndProfileInterface {
  _id: string;
  bookmaker: string;
  code: string;
  createDate: string;
  endDate: string;
  endTime: string;
  modifyDate: string;
  odd: string;
  outcome: string;
  startDate: string;
  startTime: string;
  creator: UserInterface;
}

const httpOptions = {
  withCredentials: true,
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private API_DOMAIN: string = environment.API_DOMAIN;
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

  private message = new BehaviorSubject<UserBetcodesAndProfileInterface[]>(null);
  sharedMessage = this.message.asObservable();


  constructor(private http: HttpClient) { }

  nextMessage(message: UserBetcodesAndProfileInterface[]) {
    this.message.next(message)
  }



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

  // Get a user betcodes
  getUserBetcodesByUsername(username: string): Observable<ServerResponse> {
    this.showSpinner.next(true);
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/betcodes/username/${username}`, httpOptions)
    .pipe(
      retry(2),
      tap(response => this.showSpinner.next(false), error => this.showSpinner.next(false)),
      catchError(this.handleError)
    );
  }

  // fellow user
  fellowUser(fellowObj: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/user/fellow`, fellowObj, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // unfellow user
  unFellowUser(fellowObj: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/user/unfellow`, fellowObj, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // add rate up user
  addToRateUpUser(rateUpObj: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/user/addrateup`, rateUpObj, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // remove rate up user
  removeFromRateUpUser(rateUpObj: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/user/removerateup`, rateUpObj, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // rate down user
  addToRateDownUser(rateDownObj: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/user/addratedown`, rateDownObj, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // remove rate down user
  removeFromRateDownUser(rateDownObj: any): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/user/removeratedown`, rateDownObj, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }



}
