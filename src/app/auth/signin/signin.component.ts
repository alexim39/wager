import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { ServerResponse } from '../../common/server/response.interface';
import { AuthService, SignInInterface } from '../auth.service';
import { UserService, UserInterface } from '../../core/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'async-wrong-passport',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  pageTitle: string;

  // init subscriptions list
  subscriptions: Subscription[] = [];
  passwordHide = true;
  form: FormGroup;
  user: UserInterface;
  isSpinning: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  onSignIn(formObject: SignInInterface): void {
    this.isSpinning = true;

    // push into list
    this.subscriptions.push(
      this.authService.signIn(formObject).subscribe((res: ServerResponse) => {

        if (res.code === 200) {
          localStorage.setItem('token', res.obj);

          // redirect to dashboard
          this.router.navigate(['/dashboard']);

        }
        // stop spinner
        this.isSpinning = false;
      }, (error: ErrorEvent) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 8000,
          panelClass: ['error']
        });
        // stop spinner
        this.isSpinning = false;
      })
    )

  }

  ngOnInit(): void {
    this.titleService.setTitle("Reset your account password");

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )

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

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
