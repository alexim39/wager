import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs'
import { AuthComponent } from '../../auth/auth.component';
// declare jquery as any
declare const $: any;


@Component({
  selector: 'async-nav',
  template: `
    <nav>
      <mat-toolbar color="primary">
        <!-- First row -->
        <mat-toolbar-row>
          <async-logo></async-logo>
          <span class="spacer"></span>

          <span *ngIf="!deviceXs">
            <!-- <button mat-button> Sign up </button> -->
            <button mat-button (click)="openAuthComponent()"> Sign in </button>
          </span>
          <button mat-icon-button [matMenuTriggerFor]="menu">
            <mat-icon>more_vert</mat-icon>
          </button>
        </mat-toolbar-row>

        <!-- Second row -->
        <mat-toolbar-row *ngIf="deviceXs">
          <span class="spacer"></span>
          <!-- <button mat-button> Sign up </button> -->
          <button mat-button (click)="openAuthComponent()"> Sign in </button>
        </mat-toolbar-row>

      </mat-toolbar>

      <!-- Menu dropdown items -->
      <mat-menu #menu="matMenu">
        <a mat-menu-item [routerLink]="['/firm/about']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
          <mat-icon>info</mat-icon>
          <span>About App</span>
        </a>
        <a mat-menu-item [routerLink]="['/firm/feedback']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
          <mat-icon>feedback</mat-icon>
          <span>Send Feedback</span>
        </a>
      </mat-menu>
    </nav>
  `,
  styles: [`
    nav {
      mat-toolbar {
        .spacer {
          flex: 1 1 auto;
        }
      }
    }
  `]
})
export class NavComponent implements OnDestroy, OnInit {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() deviceXs: boolean;

  constructor(
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    console.log()
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  openAuthComponent() {
    this.dialog.open(AuthComponent);
  }

}
