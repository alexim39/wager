import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/user.service';
import {PasswordService, ChangePasswordInterface} from './../password.service';


@Component({
  selector: 'async-change-password',
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
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
     mat-card {
      mat-card-content {
        form {
          mat-form-field {
            .hint {
              font-size: 0.6rem;
            }
          }
         }   
      }
     }
    }
  `],
  templateUrl: './change-password.component.html',
})
export class ChangePasswordComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  hideCurrentPassword = true;
  hideNewPassword = true;
  @Input() user: UserInterface;
  passwordForm: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private passwordService: PasswordService
  ) { }

  ngOnInit(): void {

    this.passwordForm = new FormGroup({
      currentPassword: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
          ], updateOn: 'change'
      }),
      newPassword: new FormControl('', {
        validators:
          [
            Validators.required,            
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
            //this.ageValidator
          ], updateOn: 'change'
      }),
    })
  }

  onSubmit(passwordObj: ChangePasswordInterface) {
    // ensure current and new password are not same
    if (passwordObj.currentPassword === passwordObj.newPassword) {
      this.snackBar.open(`Current password can not be the same with new password`, `Close`, {
        duration: 4000,
        panelClass: ['error']
      });
      return
    }
    // add user id
    passwordObj['userId'] = this.user._id;

    // push into list
    this.subscriptions.push(
      this.passwordService.changePassword(passwordObj).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
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
