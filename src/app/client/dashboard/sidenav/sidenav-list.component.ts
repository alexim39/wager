import { Component, OnInit } from '@angular/core';
// declare jquery as any
import * as jq from 'jquery';
import { MatSidenav } from '@angular/material/sidenav';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'async-sidenav-list',
  template: `
    <mat-nav-list>

      <a mat-menu-item (click)="toggle()"  [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
        <mat-icon>dashboard</mat-icon> Dashboard
      </a>

      <a mat-list-item class="prediction">
        <mat-icon>batch_prediction</mat-icon> Game predictions
        <mat-icon class="prediction-close">keyboard_arrow_left</mat-icon>
        <mat-icon class="prediction-open">keyboard_arrow_down</mat-icon>
      </a>
      <mat-nav-list class="predictionDropdown">
        <a mat-list-item (click)="toggle()"  [routerLink]="['/dashboard/system-prediction']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
          <span mat-line>System prediction</span>
        </a>
        <a mat-list-item (click)="toggle()"  [routerLink]="['/dashboard/betcodes']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
          <span mat-line>Weekly prediction</span>
        </a>
      </mat-nav-list>

      <!-- <a mat-list-item class="subscription">
        <mat-icon>payment</mat-icon> My subscriptions
        <mat-icon class="subscription-close">keyboard_arrow_left</mat-icon>
        <mat-icon class="subscription-open">keyboard_arrow_down</mat-icon>
      </a>
      <mat-nav-list class="subscriptionDropdown">
        <a mat-list-item (click)="toggle()"  [routerLink]="['/dashboard/subscriptions']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
          <span mat-line>Make payment</span>
        </a>
        <a mat-list-item (click)="toggle()"  [routerLink]="['/dashboard/invoices']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
          <span mat-line>My invoices</span>
        </a>
      </mat-nav-list> -->

      <!-- <a mat-menu-item [routerLink]="['/dashboard/profile']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
        <mat-icon>payment</mat-icon> My subscriptions
      </a> -->

      <!-- <a mat-menu-item [routerLink]="['/dashboard/profile']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
        <mat-icon>receipt</mat-icon> My invoices
      </a> -->

      <a mat-menu-item (click)="toggle()" [routerLink]="['/dashboard/feedback']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
        <mat-icon>feedback</mat-icon> Submit a feedback
      </a>

    </mat-nav-list>
  `,
  styles: [`
    mat-nav-list {
      a {
        font-family: 'Arial Narrow';
        font-size: 1.1em;
        mat-icon {
          margin: 0.2rem 0.4rem 0 0;
        }
      }
      .active {
          background-color: #ccc;
      }
      .prediction, .subscription {
        position: relative;
        .prediction-open, .prediction-close, .subscription-open, .subscription-close {
          position: absolute;
          right: 1rem;
          display: none;
        }
      }
      .predictionDropdown, .subscriptionDropdown {
        display: none;
        a {
          span {
            padding-left: 2.5rem;
              
          }
        }
      }
    }
  `]
})
export class SidenavListComponent implements OnInit {

  constructor(
    private matSidenav: MatSidenav,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    // init list togle
    this.listItemTogle();
  }

  private listItemTogle() {
        
    // Toggle lay indicator - prediction
    //jq( document ).ready(function( jq: any ) {
      jq('.prediction-close').show();
      jq('.prediction').click(() => {
        if (jq('.prediction-close').is(':visible')) {
          jq('.prediction-close').hide(300);
          jq('.prediction-open').show(300);
          jq('.predictionDropdown').show(100);
        } else {
          jq('.prediction-close').show(300);
          jq('.prediction-open').hide(300);
          jq('.predictionDropdown').hide(100);
        }
      });

      // Toggle lay indicator - subscription
      jq('.subscription-close').show();
      jq('.subscription').click(() => {
        if (jq('.subscription-close').is(':visible')) {
          jq('.subscription-close').hide(300);
          jq('.subscription-open').show(300);
          jq('.subscriptionDropdown').show(100);
        } else {
          jq('.subscription-close').show(300);
          jq('.subscription-open').hide(300);
          jq('.subscriptionDropdown').hide(100);
        }
      });
    //})
  }

  toggle() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      this.matSidenav.close()
    }
  }

}
