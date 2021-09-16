import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormResetterService } from 'src/app/core/form-resetter.service';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { FeedbackService, FeedbackInterface } from './feedback.service';

@Component({
  selector: 'async-feedback',
  templateUrl: './feedback.component.html',
  styles: [`
    .feedbackContainerWrapper {
      .feedbackContainer {
          width: 50%;
          mat-card {
            padding: 1em;
            mat-card-content {
              padding: 3%;
              p {
                text-align: justify;
              }
              mat-form-field {
                width: 100%;
              }
            }
            mat-card-footer {
              padding-top: 3%;
              padding-left: 3%;
            }
          }
      }
    }
    /* For tablets: */
    @media only screen and (max-width:800px) {
      .feedbackContainerWrapper {
        .feedbackContainer {
          width: 100%;
        }
      }
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      .feedbackContainerWrapper {
        .feedbackContainer {
          width: 100%;
        }
      }
    }
  `]
})
export class FeedbackComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  feedbackForm: FormGroup;
  isSpinning: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private feedbackService: FeedbackService,
    private formResetterService: FormResetterService
  ) { }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )

    this.feedbackForm = new FormGroup({
      tellUsAbout: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}')
          ], updateOn: 'change'
      }),
      feedbackMsg: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      reply: new FormControl(false),
    })
  }

  onSubmit(feedbackObj: FeedbackInterface) {
    this.isSpinning = true;

    // attach the user id
    feedbackObj['userId'] = this.user._id;
    feedbackObj['email'] = this.user.email;

    // push into list
    this.subscriptions.push(
      this.feedbackService.create(feedbackObj).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

          // reset form
          this.formResetterService.reset(this.feedbackForm);
          this.isSpinning = false;
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
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
