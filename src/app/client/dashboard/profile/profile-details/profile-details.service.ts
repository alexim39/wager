import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from '../../../../common/server/response.interface';
import { environment } from 'src/environments/environment';


export interface ProfileDetailsInterface {
    userId: string;
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    about?: string;
}

export interface BankDetailsInterface {
  userId: string;
  bankName: string;
  accountNo: string;

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
export class ProfileDetailsService {
  private API_DOMAIN: string = environment.API_DOMAIN;

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


  // update user profile
  updateProfile(profileDetails: ProfileDetailsInterface): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.API_DOMAIN}/api/user`, profileDetails, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // update user profile
  /* updateBankProfile(bankDetails: BankDetailsInterface): Observable<ServerResponse> {
    return this.http.put<ServerResponse>(`${this.API_DOMAIN}/api/user/bank`, bankDetails, httpOptions)
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  } */

  // delete user profile
  deleteProfile(userId: string): Observable<ServerResponse> {
    return this.http.delete<ServerResponse>(`${this.API_DOMAIN}/api/user/${userId}`, httpOptions)
      .pipe(
        catchError(this.handleError),
      );
  }
}
