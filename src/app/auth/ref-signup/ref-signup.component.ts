import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServerResponse } from 'src/app/common/server/response.interface';
import { AuthService, SignUpInterface } from '../auth.service';

@Component({
  selector: 'async-ref-signup',
  styles: [`
      section {
    mat-card {
        margin: 6rem 0;
        padding: 1.8rem 1.5rem;
        width: 30%;
        color: grey;
        mat-card-header {
            margin-bottom: 1rem;
            .img {
                mat-icon {
                    font-size: 6em;
                    margin-left: -0.6em
                }
            }
        }
        mat-card-content {
            form {
              mat-form-field {
                width: 100%;
                margin-bottom: 1.5rem;
                div {
                    cursor: pointer;
                }
              }
              .tnc {
                margin: 0.6em 0 0.6em -9.5em;
              }
              .newsLetter {
                margin: 0.6em 1em 0.6em -2.8em;
                color: gray;
              }
            }
        }
        mat-card-actions {
            a {
                font-weight: normal;
                font-size: 0.7rem;
                mat-icon {
                    font-size: 12px;
                    margin-top: 10px;
                }
            }
        }
    }
}
/* For tablets: */
@media (max-width: 800px) {
  section {
    mat-card {
      width: 40em;
    }
    .tnc {
      margin-top: 1em;
      padding-left: 4em;
      font-size: 0.9em;
    }
    .newsLetter {
      margin-top: 1em;
      padding-left: 4em;
      color: gray;
      font-size: 0.9em;
    }
    mat-hint {
        font-size: 0.62rem !important;
    }
  }
}
/* For mobile phones: */
@media only screen and (max-width:500px) {
    section {
        mat-card {
            width: auto;
        }
        .tnc {
          padding-top: 1em;
          padding-left: 6em;
          font-size: 0.7em;
        }
        .newsLetter {
          margin-top: 1em;
          padding-left: 6em;
          color: gray;
          font-size: 0.7em;
        }
    }
}
  `],
  template: `
   <section fxLayout="column" fxLayoutAlign="center center">
      <mat-card class="mat-elevation-z8">
        <mat-card-header fxLayout="column" fxLayoutAlign="center center">
          <small class="img">
            <mat-icon>account_circle</mat-icon>
          </small>
          <small>BETNALYSIS LOGON</small>
        </mat-card-header>
        <mat-card-content>                
              
          <form [formGroup]="form" (ngSubmit)="onSignUp(form.value)" fxLayout="column" fxLayoutAlign="center center">
            <mat-form-field>
                <mat-label>Enter last name</mat-label>
                <input matInput formControlName="lastname" placeholder="Surname">
                <!-- <mat-error *ngIf=" form.get('email').hasError('email')">
                  Please enter a valid email address
                </mat-error> -->
                <mat-error *ngIf="form.get('lastname').hasError('required')">
                  Your lastname is required
                </mat-error>
            </mat-form-field>

            <mat-form-field>
                <mat-label>Enter first name</mat-label>
                <input matInput formControlName="firstname">
                <!-- <mat-error *ngIf=" form.get('firstname').hasError('email')">
                  Please enter a valid email address
                </mat-error> -->
                <mat-error *ngIf="form.get('firstname').hasError('required')">
                  Your firstname is required
                </mat-error>
            </mat-form-field>

            <mat-form-field>
                <mat-label>Enter your email</mat-label>
                <input matInput type="email" formControlName="email">
                <mat-error *ngIf=" form.get('email').hasError('email')">
                  Please enter a valid email address
                </mat-error>
                <mat-error *ngIf="form.get('email').hasError('required')">
                  Your email is required
                </mat-error>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Enter your password</mat-label>
              <input matInput [type]="passwordHide ? 'password' : 'text'" formControlName="password">
              <div mat-icon-button matSuffix (click)="passwordHide = !passwordHide">
                <mat-icon>{{passwordHide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </div>
              <mat-error *ngIf=" form.get('password').hasError('pattern')">
                Password should be minimum of 8 characters
              </mat-error>
              <mat-error *ngIf=" form.get('password').hasError('required')">
                Your password is required
              </mat-error>
            </mat-form-field>

            <mat-slide-toggle class="tnc" color="accent" formControlName="tnc">Have you seen our T&C?</mat-slide-toggle>
            <mat-slide-toggle class="newsLetter" color="accent" formControlName="newsLetter">Wish to hear from us once in a while?</mat-slide-toggle>
              
            <button [disabled]="form.invalid || isSpinning" mat-flat-button color="accent">
              <div class="loader" *ngIf="isSpinning"></div>
              SIGN UP
            </button>
          </form>
      
        </mat-card-content>
        <mat-card-actions fxLayout="row" fxLayoutAlign="center center">
          <a matTooltip="Password recovery" mat-button [routerLink]="['/fp']"><mat-icon>password</mat-icon> Forgot password?</a> 
          <!-- <a matTooltip="Create account" mat-button [routerLink]="['/signup']"><mat-icon>create</mat-icon> Sign up</a>  -->             
        </mat-card-actions>
      </mat-card>
    </section>
  `
})
export class RefSignupComponent implements OnInit, OnDestroy {

  username: string;
  subscriptions: Subscription[] = [];
  isSpinning: boolean = false;
  passwordHide = true;
  form: FormGroup;
  
  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  ngOnInit(): void {
    // push into list
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.username = params.userId; // same as :username in route
      })
    )

    this.form = new FormGroup({
      lastname: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z]{2,80}')
          ], updateOn: 'change'
      }),
      firstname: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z]{2,80}'),
            //this.ageValidator
          ], updateOn: 'change'
      }),
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
      }),
      tnc: new FormControl(false, {
        validators:
          [
            Validators.requiredTrue
          ]
      }),
      newsLetter: new FormControl(false, {
        validators:
          [
            //Validators.requiredTrue
          ]
      }),
    })
  }

  onSignUp(formObject: SignUpInterface): void {
    this.isSpinning = true;

    formObject['referer'] = this.username;

    // push into list
    this.subscriptions.push(

      this.authService.signUp(formObject).subscribe((res: ServerResponse) => {

        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 8000,
            panelClass: ['success']
          });

          // stop spinner
          this.isSpinning = false;
          // redirect user to sign in pagd
          this.router.navigate(['/signin']);
        }

      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
        // stop spinner
        this.isSpinning = false;
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
