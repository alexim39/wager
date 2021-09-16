import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/user.service';

@Component({
  selector: 'async-mfa',
  template: `
    <mat-card>
      <mat-card-header>
          <mat-card-title>Multi-factor authentication</mat-card-title>
          <!-- <mat-card-subtitle>{{user.firstname | titlecase}} {{user.lastname | titlecase}}</mat-card-subtitle> -->
        </mat-card-header>

        <mat-card-content>
          <mat-slide-toggle color="accent" disabled>Turn on MFA</mat-slide-toggle>
        </mat-card-content>
    </mat-card>
  `,
  styles: [`
      mat-card {
        width: auto;
        margin-left: 1rem; 
        mat-card-header {
            margin-top: 16px;
        } 
        mat-card-content {
            padding: 1rem;
            form {
                mat-form-field {
                    width: 100%;
                    .hint {
                        color: orange;
                        font-family: monospace;
                        font-size: 0.8rem;
                    }
                    div {
                        mat-icon {
                            font-size: 1rem;
                            cursor: pointer;
                        }
                    }
                }
                button {
                    margin-top: 25px;
                }
            }
        }
    }
  `]
})
export class MfaComponent implements OnDestroy{

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;

  constructor() { }


  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
