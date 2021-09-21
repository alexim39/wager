import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from 'src/app/core/user.service';

@Injectable({
    providedIn: 'root'
  })
export class ReportService {

  /* private userSource = new BehaviorSubject<UserInterface>(null);
  getUser = this.userSource.asObservable();

  constructor() { }

  setUser(user: UserInterface) {
    console.log(user)
    this.userSource.next(user)
  } */

}