import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'async-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss', './activation.component.scss']
})
export class ActivationComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  isSuccess: boolean = false;
  isError: boolean = false;
  isActive: boolean = true;
  message: string;
  private userId: string;

  constructor(
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
    private route: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userId = this.router.snapshot.paramMap.get('userId');

    // push into list
    this.subscriptions.push(
      this.authService.activate(this.userId).subscribe((res) => {
        if (res.code === 200) {
          this.isSuccess = true;
          this.message = res.msg;
        }
      }, (error) => {
        this.isError = true;
        this.message = error.error.msg;
        if (error.error.code == 502) {
          this.isActive = false
        }
      })
    )

  }

  resendLink() {
    // push into list
    this.subscriptions.push(
      this.authService.resendLink(this.userId).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

          // sign user out
          setTimeout(() => {
            // redirect user to task list
            this.route.navigateByUrl(`/signin`);
          }, 4000);

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
