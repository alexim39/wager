import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventTriggerService } from 'src/app/common/event-trigger.service';
import { UserInterface } from 'src/app/core/user.service';
import { ReportService } from '../report/resport.service';
import { UserBetcodesAndProfileInterface, UserProfileService } from '../user-profile.service';
import { RateClass } from './rater.class';

@Component({
  selector: 'async-rater',
  styles: [`
    section {
      margin-top: 1em;
      height: inherit;
      padding: 1em;
      border: 1px solid #ddd;
      .followers {
        button {
          span {
            color: gray;
          }
        }
      }
      .rate {
        button {
          margin-left: 1em;
          mat-icon {
            margin: auto 0;
            font-size: 20px;
            text-align: center;
          }
          span {
            font-weight: bold;
            font-size: 1em;
            padding-left: 5px;
          }
        }
      }
    }
  `],
  template: `
    <section fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutAlign="space-between center" fxLayoutGap="1em">
      <div>
        CURRENT RATING: {{rating}}%
      </div>

      <div class="followers">
        <button disabled mat-stroked-button matTooltip="Number of followers">
          FOLLOWERS: 
          <span>{{followers}}</span>
        </button>
      </div>

      <div class="rate">
        <button (click)="onRateUp()" mat-stroked-button color="{{primary}}" matTooltip="Rate up">
          <mat-icon>thumb_up</mat-icon>
          <span>{{numberOfUpRate}}</span>
        </button>
        <button (click)="onRateDown()" mat-stroked-button color="{{warn}}" matTooltip="Rate down">
          <mat-icon>thumb_down</mat-icon>
          <span>{{numberOfDownRate}}</span>
        </button>
        <button [disabled]="isOwner" (click)="loadReportPage()" mat-stroked-button matTooltip="Report user for abuse">
          REPORT <span>{{numberOfReports}}</span>
        </button>
      </div>
    </section>
  `
})
export class RaterComponent extends RateClass implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() userBetcodesAndProfile: UserBetcodesAndProfileInterface[] = [];
  foundUserProfile: UserInterface;
  @Input() currentUser: UserInterface;
  isOwner: boolean = false;

  primary: string;
  warn: string;
  followers: number = 0;
  isRatedUp: boolean;
  isRatedDwon: boolean;
  numberOfReports: number = 0;

  constructor(
    private snackBar: MatSnackBar,
    private userProfileService: UserProfileService,
    private eventTriggerService: EventTriggerService,
    private router: Router,
    private reportService: ReportService
  ) { 
    super();
  }

  ngOnInit(): void {
    
    // get user rating
    super.userRating(this.userBetcodesAndProfile);

    // get found user
    this.foundUserProfile = this.userBetcodesAndProfile[0].creator;
    // set user followers
    this.followers = this.foundUserProfile.followers.length;

    // set user for shareing with report component
    this.reportService.setUser(this.foundUserProfile);

    // get user rating
    this.isRatedUp = super.ratedUp(this.foundUserProfile, this.currentUser._id);
    this.isRatedDwon = super.ratedDwon(this.foundUserProfile, this.currentUser._id);

    // check user rating selection
    if (this.isRatedUp) {
      this.primary = 'primary';
    }
    if (this.isRatedDwon) {
      this.warn = 'warn';
    }

    // subscribe to service to trigger update
    this.subscriptions.push(
      this.eventTriggerService.invokeEvent.subscribe(trigger => {
        if (trigger === 'add') {
          // call method
          this.addFollowers();
        }
        if (trigger === 'remove') {
          this.premoveFollowers()
        }
      })
    )

    // check if currentUser is foundUserProfile
    if (this.foundUserProfile._id === this.currentUser._id) {
      this.isOwner = true;
    }

    this.subscriptions.push(
      this.reportService.getReports(this.foundUserProfile._id).subscribe((res) => {
        if (res.code === 200) {
         this.numberOfReports = res.obj.length;
        }
      })
    )
    
  }

  // called from user profile component
  private addFollowers(): void {
    this.followers = this.followers + 1;
  }

  // call from user profile component
  premoveFollowers(): void {
    this.followers = this.followers - 1;
  }

  onRateUp() {

    const ratingObj = {
      ratee: this.foundUserProfile._id,
      rater: this.currentUser._id
    }


      if (!this.isRatedUp) {
        // push into list
        this.subscriptions.push(
          this.userProfileService.addToRateUpUser(ratingObj).subscribe((res) => {
            if (res.code === 200) {
              this.snackBar.open(`${res.msg}`, `Close`, {
                duration: 4000,
                panelClass: ['success']
              });

              this.isRatedUp = true;
              this.isRatedDwon = false;
              this.primary = 'primary';
              this.warn = null;

              // add to rate up
              super.addRateUp();

            }
          }, (error) => {
            this.snackBar.open(`${error.error.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['error']
            });
          })
        )
      }

      if (this.isRatedUp) {
        // push into list
        this.subscriptions.push(
          this.userProfileService.removeFromRateUpUser(ratingObj).subscribe((res) => {
            if (res.code === 200) {
              this.snackBar.open(`${res.msg}`, `Close`, {
                duration: 4000,
                panelClass: ['success']
              });

              this.isRatedUp = null;
              this.isRatedDwon = null;
              this.primary = null;
              this.warn = null;

              // remove to rate up
              super.removeRateUp();

            }
          }, (error) => {
            this.snackBar.open(`${error.error.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['error']
            });
          })
        )
      }

      if (this.isRatedDwon && this.warn === 'warn') {

        // push into list
        this.subscriptions.push(
          this.userProfileService.removeFromRateDownUser(ratingObj).subscribe((res) => {
            if (res.code === 200) {
              this.snackBar.open(`${res.msg}`, `Close`, {
                duration: 4000,
                panelClass: ['success']
              });

              this.isRatedDwon = null;
              this.isRatedUp = null;
              this.warn = null;
              this.primary = null;

              // remove to rates down
              //super.addRateUp();
              super.removeRateDownAndAddUpRate();


            }
          }, (error) => {
            this.snackBar.open(`${error.error.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['error']
            });
          })
        )        

      }

  }

  onRateDown() { 

    const ratingObj = {
      ratee: this.foundUserProfile._id,
      rater: this.currentUser._id
    }

      if (!this.isRatedDwon) {
        // push into list
        this.subscriptions.push(
          this.userProfileService.addToRateDownUser(ratingObj).subscribe((res) => {
            if (res.code === 200) {
              this.snackBar.open(`${res.msg}`, `Close`, {
                duration: 4000,
                panelClass: ['success']
              });

              this.isRatedDwon = true;
              this.isRatedUp = false;
              this.warn = 'warn';
              this.primary = null;

              // add to rates down
              super.addRateDown();


            }
          }, (error) => {
            this.snackBar.open(`${error.error.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['error']
            });
          })
        )
      }

      if (this.isRatedDwon) {
        // push into list
        this.subscriptions.push(
          this.userProfileService.removeFromRateDownUser(ratingObj).subscribe((res) => {
            if (res.code === 200) {
              this.snackBar.open(`${res.msg}`, `Close`, {
                duration: 4000,
                panelClass: ['success']
              });

              this.isRatedDwon = null;
              this.isRatedUp = null;
              this.warn = null;
              this.primary = null;

              // remove to rates down
              super.removeRateDown();


            }
          }, (error) => {
            this.snackBar.open(`${error.error.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['error']
            });
          })
        )
      }

      if (this.isRatedUp && this.primary === 'primary') {

        // push into list
        this.subscriptions.push(
        this.userProfileService.removeFromRateUpUser(ratingObj).subscribe((res) => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });

            this.isRatedUp = null;
            this.isRatedDwon = null;
            this.primary = null;
            this.warn = null;

            // remove to rate up
            super.removeRateUpAndAddDownRate();

          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
        })
      )

    }
  }

  loadReportPage() {
    this.router.navigateByUrl(`dashboard/${this.foundUserProfile.username}/report`);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
