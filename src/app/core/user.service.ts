import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { ServerResponse } from '../common/server/response.interface';
import { environment } from 'src/environments/environment';

export interface UserInterface {
    // members
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    isActive: boolean;

    // other members
    about?: string;
    phone?: string;
    username: string;
    followers?: UserInterface[];
    ratedowns?: UserInterface[];
    rateups?: UserInterface[];
    referer?: string;
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
export class UserService {
    private API_DOMAIN: string = environment.API_DOMAIN;

    constructor(private http: HttpClient) { }

    // get user details
    getUser(): Observable<UserInterface> {
        return this.http.get<ServerResponse>(`${this.API_DOMAIN}/api/user`, httpOptions)
        .pipe(
            retry(2), // retry a failed request up to 2 times
            //catchError(this.handleError)
            map((res: ServerResponse) => {
                if (res.code === 200) {
                    //console.log(res.obj)
                    return res.obj
                }
            })
        );
    }
  
}
