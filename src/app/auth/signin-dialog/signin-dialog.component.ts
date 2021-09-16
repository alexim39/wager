import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService, SignInInterface } from '../auth.service';
import { ServerResponse } from '../../common/server/response.interface';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthComponent } from '../auth.component';
import { UserInterface, UserService } from '../../core/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'async-signin',
  styleUrls: ['./signin-dialog.component.scss'],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSignIn(form.value)">
      <h1>Sign in</h1>
      <!-- <div class="social-container">
          <a href="#" class="facebook"><i class="material-icons" title="Facebook">facebook</i></a>
          <a href="#"><i class="fab fa-google-plus-g"></i></a>
          <a href="#"><i class="fab fa-linkedin-in"></i></a>
      </div> -->
      <span>Use your email to sign in</span>

      <mat-form-field>
          <mat-label>Email address</mat-label>
          <input matInput type="email" formControlName="email">
          <mat-error *ngIf=" form.get('email').hasError('email')">
              Please enter a valid email address
          </mat-error>
          <mat-error *ngIf="form.get('email').hasError('required')">
              Your email is required
          </mat-error>
      </mat-form-field>

      <mat-form-field>
          <mat-label>Password</mat-label>
          <input matInput [type]="signIn_hide ? 'password' : 'text'" formControlName="password">
          <div mat-icon-button matSuffix (click)="signIn_hide = !signIn_hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="signIn_hide">
              <mat-icon>{{signIn_hide ? 'visibility_off' : 'visibility'}}</mat-icon>
          </div>
          <mat-error *ngIf=" form.get('password').hasError('pattern')">
              Password should be minimum of 8 characters
          </mat-error>
          <mat-error *ngIf=" form.get('password').hasError('required')">
              Your password is required
          </mat-error>
      </mat-form-field>

      <button [disabled]="form.invalid || isSpinning" mat-flat-button color="accent">
          <div class="loader" *ngIf="isSpinning"></div>
          SIGN IN
      </button>

      <a (click)="closeDialog()" [routerLink]="['/fp']">Forgot your password?</a>
    </form>
  `
})
export class SigninDialogComponent implements OnInit, OnDestroy {

  signIn_hide = true;
  currentUser: UserInterface;
  subscriptions: Subscription[] = [];
  form: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private thisDialogRef: MatDialogRef<AuthComponent>,
    private snackBar: MatSnackBar,
    private router: Router,
    private UserService: UserService,
    private authService: AuthService
  ) { }

  onSignIn(formObject: SignInInterface): void {
    this.isSpinning = true;

    // push into list
    this.subscriptions.push(
      this.authService.signIn(formObject).subscribe((res: ServerResponse) => {

        if (res.code === 200) {
          localStorage.setItem('token', res.obj);

          // redirect to dashboard
          this.router.navigate(['/dashboard']);
          // close dialog
          this.thisDialogRef.close()
          // stop spinner
          this.isSpinning = false;

        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
        // stop spinner
        this.isSpinning = false;

        /* if (error.status === 401) {
          if (typeof(Storage) !== "undefined") {
            if (localStorage.clickcount) {
              localStorage.clickcount = Number(localStorage.clickcount)+1;
            } else {
              localStorage.clickcount = 1;
            }
            // check if click is >= 3 times
            if (localStorage.clickcount >= 3) {
              // set user details on shared data service
              // to enable the use of user details on other components
              //this.UserService.setUser(error.error.obj);

              // redirect to other page
              this.router.navigate(['/signin']);
              localStorage.removeItem('clickcount')
              // close dialog
              this.thisDialogRef.close()
            }
          }
        } */
      })
    )

  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.email
          ], updateOn: 'change'
      }),
      password: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
          ], updateOn: 'change'
      })
    })
  }

  closeDialog(): void {
    // close dialog
    this.thisDialogRef.close()
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
