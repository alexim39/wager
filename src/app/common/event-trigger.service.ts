import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventTriggerService {

  invokeEvent: Subject<string> = new Subject();

  constructor() { }

  callMethodFromAnotherComponent(trigger: string) { 
    this.invokeEvent.next(trigger)      
  }
}
