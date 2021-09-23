import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventTriggerService } from 'src/app/common/event-trigger.service';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { UserBetcodesAndProfileInterface, UserProfileService } from './user-profile.service';

@Component({
  selector: 'async-user-profile',
  styles: [`
    section {
      .not-activated-account {
        text-align: center;
        font-weight: bold;
        color: orange;
        a {
          text-decoration: none;
        }
      }
    }
    .profile-area {
      background: whitesmoke;
      padding: 2em;
      img {
        width: 5em;
        height: 5em;
        border-radius: 50%;
      }
      h1 {
        small {
          font-size: 0.5em;
          color: gray;
        }
      }
      p {
        color: gray;
        text-align: left;
        font-size: 0.8em;
      }
      .line {
        margin: 3em 0;
        width: 100%;
        hr {
          color: #eee;
        }
      }
      section{
        width: 100%;
        height: 5em;
        margin-top: -1em;
        font-size: 0.9em;
        border-bottom: 1px solid #ccc;
        .social {
          float: left;
        }
        .value {
          color: gray;
          text-align: right;
          float: right;
        }
      }
    }
    .no-user-found {
        text-align: center;
      p {
        color: orange;
        margin: 2em;
        font-weight: bold;
      }
    } 
  `],
  template: `
    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
        </li>
        <li>User profile</li>
        <li>{{username | lowercase}} <!-- {{user.lastname | titlecase}} {{user.firstname | titlecase}} --></li>
      </ul>
    </div>

    <div *ngIf="userProfileService.showSpinner | async" fxLayout="column" fxLayoutAlign="space-between center" fxLayoutGap="1em" style="color: gray;">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <span>Loading...</span>
    </div>
    <div *ngIf="!(userProfileService.showSpinner | async)">

      <section *ngIf="isEmptyResponse">
        <div fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutGap="1em">

          <section class="profile-area" fxFlex="30" fxLayout="column" fxLayoutAlign="center center">
            <img class="profile-img clickable" [src]="profileImg"/>
            <h1>{{foundUserProfile.lastname | titlecase }} {{foundUserProfile.firstname | titlecase }} <small *ngIf="isOwner">(Your Profile) </small></h1>
            <p>
              {{foundUserProfile.about | sentencecase}}
            </p>
            <div class="btn" fxLayout="row" fxLayoutGap="1em">
              <button *ngIf="!isUserFollowing" mat-flat-button color="primary" (click)="follow(foundUserProfile._id)">FELLOW</button>
              <button *ngIf="isUserFollowing" mat-flat-button color="primary" (click)="unFollow(foundUserProfile._id)">UNFELLOW</button>

              <button [disabled]="isOwner" mat-stroked-button color="primary">MESSAGE</button>
            </div>

            <div class="line"><hr></div>

            
            <section fxLayout="row" fxLayoutAlign="space-between center">
              <div class="social">
                <!-- <mat-icon>website</mat-icon> -->
                Website
              </div>
              <div class="value">
                www.example.com
              </div>
            </section>
            <section fxLayout="row" fxLayoutAlign="space-between center">
              <div class="social">
                <!-- <mat-icon>instagram</mat-icon> -->
                Instagram
              </div>
              <div class="value">
                www.example.com
              </div>
            </section>
            <section fxLayout="row" fxLayoutAlign="space-between center">
              <div class="social">
                <!-- <mat-icon>facebook</mat-icon> -->
                Facebook
              </div>
              <div class="value">
                www.example.com
              </div>
            </section>

          </section>

          <section fxFlex="70" fxLayout="column" fxLayoutGap="1em">
            <router-outlet></router-outlet>
          </section>
        </div>
      </section>
      <section class="no-user-found" *ngIf="!isEmptyResponse">
        <p>No user found</p>
      </section>
    </div>
  `
})
export class UserProfileComponent implements OnInit, OnDestroy  {

  username: string;
  subscriptions: Subscription[] = [];
  isEmptyResponse: Boolean;

  userBetcodesAndProfile: UserBetcodesAndProfileInterface[] = [];
  foundUserProfile: UserInterface;
  currentUser: UserInterface;
  isUserFollowing: boolean = false;
  isOwner: boolean = false;

  profileImg: string = "./assets/img/profile.jpg";

  constructor(
    private snackBar: MatSnackBar,
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: Title,
    public userProfileService: UserProfileService,
    private eventTriggerService: EventTriggerService
  ) { 
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  // check for empty response
  private emptyResponse(array: any) {
    if (array.length === 0) {
      // array empty or does not exist
      this.isEmptyResponse = false;
    }else{
      this.isEmptyResponse = true;
    }
  }

  ngOnInit() {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.currentUser = user;
      })
    )

    // push into list
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.username = params.username; // same as :username in route
        // push into list
        this.subscriptions.push(
          this.userProfileService.getUserBetcodesByUsername(this.username).subscribe((res) => {
            if (res.code === 200) {

              // check empty response
              this.emptyResponse(res.obj);
              
              this.userBetcodesAndProfile = res.obj;
              // get user profile
              this.foundUserProfile = this.userBetcodesAndProfile[0].creator;

              // check if currentUser is foundUserProfile
              if (this.foundUserProfile._id === this.currentUser._id) {
                this.isOwner = true;
              }

              // check if user has already clicked fellow button
              this.foundUserProfile.followers.forEach((follower) => {
                if (this.currentUser._id === follower._id) {
                  this.isUserFollowing = true;
                }
              })

              // share data
              this.userProfileService.nextMessage(this.userBetcodesAndProfile);

            }
          })
        )
      })
    )

    
  }

  follow(foundUserId: string) {

    const followObj = {
      followee: foundUserId,
      follower: this.currentUser._id
    }

    // push into list
    this.subscriptions.push(
      this.userProfileService.fellowUser(followObj).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

          this.isUserFollowing = true;
          // call ratecomponent to update number
          this.eventTriggerService.callMethodFromAnotherComponent('add');
        }
      }, (error) => {
        this.snackBar.open(`${error.error.msg}`, `Close`, {
          duration: 4000,
          panelClass: ['error']
        });
      })
    )
  }

  unFollow(foundUserId: string) {  

    const followObj = {
      followee: foundUserId,
      follower: this.currentUser._id
    }

    // push into list
    this.subscriptions.push(
      this.userProfileService.unFellowUser(followObj).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });
          this.isUserFollowing = false;
          // call ratecomponent to update number
          this.eventTriggerService.callMethodFromAnotherComponent('remove');
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
