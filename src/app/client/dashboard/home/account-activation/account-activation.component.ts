import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService, UserInterface } from './../../../../core/user.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'async-account-activation',
  template: `
    <!-- show on desktop -->
    <div *ngIf="!isActive" fxHide fxShow.gt-sm>
      <mat-card fxLayout="row" fxLayoutAlign="space-between center">
        <span class="warning">Your account is not yet activated, check your email to get your account activated or click resend icon to activate</span>
        <span class="icons">
          <mat-icon class="email" (click)="resendActivationLink()" matTooltip="Resend activation link">email</mat-icon>
          <mat-icon class="close" (click)="closeActivationWarning()">close</mat-icon>
        </span>
      </mat-card>
    </div>

    <!-- show on mobile -->
    <div *ngIf="!isActive" fxHide fxShow.lt-md>
      <mat-card fxLayout="row" fxLayoutAlign="space-between center">
        <span class="warning">Use your email to activate account</span>
        <span class="icons">
          <mat-icon class="email" (click)="resendActivationLink()" matTooltip="Resend activation link">email</mat-icon>
          <mat-icon class="close" (click)="closeActivationWarning()">close</mat-icon>
        </span>
      </mat-card>
    </div>
  `,
  styles: [`
    mat-card {
      background-color: whitesmoke;
      .warning {
        color: rgb(255, 115, 0);
      }
      .icons {
        .email {
          cursor: pointer;
          color:rgb(255, 115, 0)
        }
        .email:hover {
          color: gray;
        }
        .close {
          margin-left: 15px;
          float: right;
          cursor: pointer;
        }
      }
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      mat-card {
        font-size: 0.8em;
      }
    }
  `]
})
export class AccountActivationComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  isActive: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user) => {
        this.user = user;
        this.isActive = this.user.isActive;
      })
    )
  }

  // user active notification bar
  closeActivationWarning() {
    this.isActive = true;
  }

  // resend activation link to user email
  resendActivationLink() {
    // push into list
    this.subscriptions.push(
      this.authService.resendLink(this.user._id).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['success']
        });
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
