import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';

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
    <section *ngIf="!isActive">
      <p class="not-activated-account">Your account is not yet activated. <a  [routerLink]="['/dashboard']" routerLinkActive="active">Activate to continue</a></p>
    </section>

    <section *ngIf="isActive">
      <div fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutGap="1em">
        <section class="profile-area" fxFlex="30" fxLayout="column" fxLayoutAlign="center center">
          <img class="profile-img clickable" [src]="profileImg"/>
          <h1>{{user.lastname | titlecase }} {{user.firstname | titlecase }}</h1>
          <p>
            {{user.about | sentencecase}}
          </p>
          <div class="btn" fxLayout="row" fxLayoutGap="1em">
            <button mat-flat-button color="primary">FELLOW</button>
            <button mat-stroked-button color="primary">MESSAGE</button>
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

        <section fxFlex="70">
          <router-outlet></router-outlet>
        </section>
      </div>
    </section>
  `
})
export class UserProfileComponent implements OnInit, OnDestroy {

  username: string;
  // init subscriptions list
  subscriptions: Subscription[] = [];
  //codeUploadForm: FormGroup;
  user: UserInterface;
  isActive: boolean;
  isSpinning: boolean = false;

  profileImg: string = "./assets/img/profile.jpg";

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: Title,
  ) { 
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  ngOnInit() {
    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
        this.isActive = this.user.isActive;
        console.log(this.user)
      })
    )

    // push into list
    this.subscriptions.push(
      this.route.params.subscribe((params: Params) => {
        this.username = params.username; // same as :username in route
        console.log(this.username)
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
