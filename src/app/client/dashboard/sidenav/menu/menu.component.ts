import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface } from './../../../../core/user.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'async-sidenav-menu',
  template: `
    <mat-toolbar class="sideMenu">
          <!-- <img [src]="imagePath" /> -->
          <span class="img">
            <mat-icon>account_circle</mat-icon>
          </span>
          {{currentUser.firstname | titlecase }}
          <span class="spacer"></span>
          <button mat-icon-button [matMenuTriggerFor]="user">
            <mat-icon>more_vert</mat-icon>
          </button>
          <mat-menu #user="matMenu" xPosition="before">

            <a mat-menu-item (click)="toggle()" [routerLink]="['/dashboard/profile']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
              <mat-icon>person</mat-icon>
              Profile
            </a>

            <a mat-menu-item (click)="toggle()" [matMenuTriggerFor]="security" [routerLink]="['/dashboard/security']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
              <mat-icon>security</mat-icon>
              Security
            </a>
            <mat-menu #security="matMenu">
              <a mat-menu-item (click)="toggle()" [routerLink]="['/dashboard/security/password']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}"> 
                <mat-icon>password</mat-icon>
                Password
              </a>
            </mat-menu>

            <!-- <a mat-menu-item [routerLink]="['/dashboard/donate']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
              <mat-icon>paid</mat-icon>
              <span>Donate</span>
            </a> -->

          </mat-menu>

        </mat-toolbar>
  `,
  styles: [`
  .sideMenu {
        background-color:#009688;
        color: whitesmoke;
        font-size: 15px;
        .spacer {
          flex: 1 1 auto;
        }
        .img {
          margin: 10px 20px 0 0;
          display: inline-block;
            mat-icon {
                font-size: 3em;
                
            }
        }
      }
  `]
})
export class SidenavMenuComponent implements OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  imagePath: string = `./../../../assets/img/profile.jpg`;
  @Input() currentUser: UserInterface;

  constructor(
    private matSidenav: MatSidenav,
    private breakpointObserver: BreakpointObserver
  ) { }

  toggle() {
    const isSmallScreen = this.breakpointObserver.isMatched('(max-width: 599px)');
    if (isSmallScreen) {
      this.matSidenav.close()
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
