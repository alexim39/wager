import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService, NewPasswordInterface } from './../auth.service';

@Component({
  selector: 'async-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss', './new-password.mobile.scss']
})
export class NewPasswordComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  userId: string;

  passwordHide = true;
  public form: FormGroup;
  //user: UserInterface;

  constructor(
    //private userService: UserService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) { }

  onSubmit(newPasswordObj: NewPasswordInterface) {

    newPasswordObj['userId'] = this.userId;

    // push into list
    this.subscriptions.push(
      this.authService.change(newPasswordObj).subscribe((res) => {

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

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');

    this.form = new FormGroup({
      password: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9!@#$%^&*()-_=+?/.>,<;:]{8,80}') // min of 8 any character lower/upper case with optionally any of attached special character or digit and mix of 80
          ], updateOn: 'change'
      }),

    })
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
