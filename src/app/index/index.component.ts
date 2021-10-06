import { Component, OnInit, OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs'

@Component({
  selector: 'async-index',
  template: `
  <div fxLayout="column" fxFlexFill>
    <async-nav [deviceXs]="deviceXs"></async-nav>
    <div id="page-wrap">
      <div id="content-wrap">
        <router-outlet></router-outlet>
      </div>
      <div id="footer-wrap">
        <async-footer></async-footer>
      </div>
    </div>
  </div>  `,
  styles: [`
  #page-wrap {
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
  }
  #content-wrap {}
  #footer-wrap {
    margin-top: auto;
  }

  @media only screen and (max-width:800px) {
    #footer-wrap {
      font-size: 0.9em
    }
  }
  `]
})
export class IndexComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  deviceXs: boolean;

  constructor(private mediaObserver: MediaObserver) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mediaObserver.media$.subscribe((media: MediaChange) => {

        // NOTE media.mqAlias: xs, sm, md, lg, xl
        this.deviceXs = media.mqAlias === 'xs' ? true : false;
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
