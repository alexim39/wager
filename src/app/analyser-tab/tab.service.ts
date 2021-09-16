import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from './../common/server/response.interface';
import { environment } from 'src/environments/environment';
import { CountriesInterface } from './../index/contents/contents.service';


export interface TrippleOddInterface {
  homeOdd: number;
  drawOdd: number;
  awayOdd: number;
}

export interface DoubleOddInterface {
  homeOdd: number;
  awayOdd: number;
}

export interface FootbalTeamInterface {
  team_id: number;
  name: string;
  league: string;
  logo: string;
  short_code?: string;
  country?: CountriesInterface
}

export interface MatchInterface {
  match_id: number;
  status: string;
  match_start: Date;
  league_id: number
  home_team: FootbalTeamInterface;
  away_team: FootbalTeamInterface;
  stats: any;
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
export class TabService {
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

  getMatchesBySeason(seasonId: number): Observable<any> {
    return this.http.get<any>(`https://app.sportdataapi.com/api/v1/soccer/matches?apikey=8c911390-0b3a-11ec-9c99-db1e436dc701&season_id=${seasonId}`, {headers:{skip:"true"}})
      .pipe(
        retry(2), // retry a failed request up to 2 times
        catchError(this.handleError)
      );
  }
}