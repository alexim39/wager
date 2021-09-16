import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../../common/server/response.interface';
import { environment } from 'src/environments/environment';


export interface CountriesInterface {
    id: number;
    name: string;
    country_code?: string;
    continent?: string;
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
export class ContentsService {
  
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

   /*  // get all countries
    getCountries(): Observable<any> {
    // return all countries covered by the API
    return this.http.get<any>(`https://app.sportdataapi.com/api/v1/soccer/countries?apikey=0412cf90-f42e-11eb-8ad7-db8bfb781ee7`)
      .pipe(
        //retry(2), // retry a failed request up to 2 times
        catchError(this.handleError)
      );
    } */

   /*  // get all leagues
    getLeagues(): Observable<any> {
        // return all countries covered by the API
        return this.http.get<any>(`https://app.sportdataapi.com/api/v1/soccer/leagues?apikey=0412cf90-f42e-11eb-8ad7-db8bfb781ee7`)
          .pipe(
            //retry(2), // retry a failed request up to 2 times
            catchError(this.handleError)
        );
    } */
}