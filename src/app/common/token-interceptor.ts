import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    constructor() {   }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.headers.get("skip")) { // skip if API endpoint
            const newHeaders = req.headers.delete('skip')
            const newRequest = req.clone({ headers: newHeaders });
            return next.handle(newRequest);
        } else {
            const tokenizedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.getToken()}`
                }
            })
            return next.handle(tokenizedReq);
        }
    }

    getToken() {
        return localStorage.getItem('token')
    }
}