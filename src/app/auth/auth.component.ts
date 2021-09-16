import { Component, OnInit, OnDestroy } from '@angular/core';
// declare jquery as any
declare const $: any;
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import { Subscription } from 'rxjs';


@Component({
  selector: 'async-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', './auth.mobile.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  deviceXs: boolean;
  toggle: boolean = false;

  constructor(
    private mediaObserver: MediaObserver
  ) { 
    this.subscriptions.push(
      this.mediaObserver.media$.subscribe((change: MediaChange) => {
        this.deviceXs = change.mqAlias === 'xs' ? true : false;
        //console.log(this.deviceXs)
      })
    )
  }

  ngOnInit(): void {

    // jquery ready
    $(document).ready(() => {
      $('#signUp').click(() => {
        $('.container').addClass("right-panel-active");
      })

      $('#signIn').click(() => {
        $('.container').removeClass("right-panel-active");
      })
    })
  }

  toggleAuth() {
    this.toggle = !this.toggle;
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
