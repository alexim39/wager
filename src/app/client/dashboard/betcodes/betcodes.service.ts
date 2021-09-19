import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../../../common/server/response.interface';
import { environment } from 'src/environments/environment';

export interface BetcodesInterface {
  _id?: string;
  bookmaker: string;
  code: string;
  odd: number;
  status: string;
  outcome: string;
  startDate: Date | string;
  startTime: Date | string;
  endDate: Date | string;
  endTime: Date | string;
  creator?: string;
  createDate?: Date;
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
export class BetcodesService {
  private readonly API_DOMAIN: string = environment.API_DOMAIN;
  showSpinner: BehaviorSubject<boolean> = new BehaviorSubject(undefined);

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


  // Get all betcodes
  betcodes(): Observable<ServerResponse> {
    this.showSpinner.next(true);
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/betcodes`, httpOptions)
    .pipe(
      retry(2),
      tap(response => this.showSpinner.next(false), error => this.showSpinner.next(false)),
      catchError(this.handleError)
    );
  }

  // Get a user betcodes
  getUserBetcodes(userId: string): Observable<ServerResponse> {
    this.showSpinner.next(true);
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/betcodes/${userId}`, httpOptions)
    .pipe(
      retry(2),
      tap(response => this.showSpinner.next(false), error => this.showSpinner.next(false)),
      catchError(this.handleError)
    );
  }

  // create
  create(codeObj: BetcodesInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/betcodes`, codeObj, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // update
  update(updateObj: any): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.API_DOMAIN}/api/betcodes`, updateObj, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // delete
  delete(codeId: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.API_DOMAIN}/api/betcodes/${codeId}`, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // get current betcode status
  betcodesStatus(betcodes: BetcodesInterface[])  {
      const bc: BetcodesInterface[] = [];
    /* 
      game starting today
      game have ended
      game starting in 4 days
    */

    // get start date
    betcodes.forEach((betcode: BetcodesInterface) => {
      //get todays date
      const todaysDate: Date = new Date();
      // Get start date
      const startDate: Date = new Date(betcode.startDate);
      // Get end date
      const endDate: Date = new Date(betcode.endDate);

      // check if game is starting today
      if (startDate.setHours(0,0,0,0) == todaysDate.setHours(0,0,0,0)) {
        // Date equals today's date
        betcode['status'] = 'Starting today';
        bc.push(betcode);
      }
      if (startDate < todaysDate && endDate < todaysDate) {
        // Date equals past date
        betcode['status'] = 'Expired';
        bc.push(betcode);
      }
      if (startDate < todaysDate && endDate >= todaysDate) {
        // Date equals past date
        betcode['status'] = 'In progress';
        bc.push(betcode);
      }
      if (startDate > todaysDate) {
        // Date equals past date
        betcode['status'] = 'Not started';
        bc.push(betcode);
      }
        
    })
  }

}