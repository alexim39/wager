import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServerResponse } from 'src/app/common/server/response.interface';
import { UserInterface } from 'src/app/core/user.service';
import { environment } from 'src/environments/environment';


export interface ReportInterface {
  tellUsAboutUser: string;
  reportMsg: string;
  reply: boolean;
  reporter: string;
  reportee: string;
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
export class ReportService {
  private API_DOMAIN: string = environment.API_DOMAIN;

  private userSource = new BehaviorSubject<UserInterface>(null);
  getFoundUser = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  setUser(user: UserInterface) {
    this.userSource.next(user)
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


  // create report
  create(reportObj: ReportInterface): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.API_DOMAIN}/api/report`, reportObj, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

  // create new feedback
  getReports(userId: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/report/${userId}`, httpOptions)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError),
      );
  }

}