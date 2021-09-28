import { Component, Inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { RefererInterface, RefererService } from './referer.service';
//import { DOCUMENT } from '@angular/common';



const ELEMENT_DATA: RefererInterface[] = [
  {no: 1, user: 'Alex Imenwo', signUpDate: 'Sept 11, 2021', bonusAmount: 2000},
];

@Component({
  selector: 'async-referer',
  styles: [`
    section {
      .referer-link {
        background: whitesmoke;
        padding: 2em;
        text-align: center;
        p {
          color: gray;
          word-wrap: break-word;
        }
      }
      .referer-list {
        margin-top: 1em;
        width: 100%;
        table {
          width: 100%;
        }
        p {
          color: orange;
          font-weight: bold;
          text-align: center;
          margin-top: 2em;
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
        <li>invite a friend</li>
      </ul>
    </div>

    <section>
      <div class="referer-link">
        <p>Copy and send below link to friends and get cash bonus when they subscribe</p>
        <!-- <p>http://wager.com.ng/r/{{refererId}}</p> -->
        <p>http:localhost:4200/signup/r/{{refererId}}</p>
        <!-- <mat-slide-toggle [(ngModel)]="isChecked" (change)="onChange()">Show my username</mat-slide-toggle> -->
      </div>

      <div class="referer-list">
        <div *ngIf="refererService.showSpinner | async" fxLayout="column" fxLayoutAlign="space-between center" fxLayoutGap="1em" style="color: gray;">
          <mat-progress-bar mode="indeterminate"></mat-progress-bar>
          <span>Loading...</span>
        </div>
        <div *ngIf="!(refererService.showSpinner | async)">
          <ng-container *ngIf="!noReferer" >
            <table mat-table [dataSource]="dataSource" class="mat-elevation-z0">

              <ng-container matColumnDef="no">
                <th mat-header-cell *matHeaderCellDef> NO. </th>
                <td mat-cell *matCellDef="let referer; let i = index;"> {{i + 1}} </td>
              </ng-container>

              <ng-container matColumnDef="user">
                <th mat-header-cell *matHeaderCellDef> USER </th>
                <td mat-cell *matCellDef="let referer"> {{referer.user}} </td>
              </ng-container>

              <ng-container matColumnDef="signUpDate">
                <th mat-header-cell *matHeaderCellDef> SIGN UP DATE </th>
                <td mat-cell *matCellDef="let referer"> {{referer.signUpDate | date}} </td>
              </ng-container>

              <ng-container matColumnDef="bonusAmount">
                <th mat-header-cell *matHeaderCellDef> EARNED AMOUNT </th>
                <td mat-cell *matCellDef="let referer"> {{referer.bonusAmount | currency:'NIG':'&#8358;'}} </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="['no', 'user', 'signUpDate', 'bonusAmount']"></tr>
              <tr mat-row *matRowDef="let row; columns: ['no', 'user', 'signUpDate', 'bonusAmount'];"></tr>
            </table>
          </ng-container>
          <ng-container *ngIf="noReferer" >
            <p>You dont have any referer yet</p>
          </ng-container>
      </div>
        </div>
    </section>
  `
})
export class RefererComponent implements OnInit {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  refererId: string;
  isChecked: boolean = false;
  domain: string;
  noReferer: boolean;
  //referers: UserInterface[];

  dataSource = ELEMENT_DATA;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private userService: UserService,
    public refererService: RefererService
    //@Inject(DOCUMENT) private document: any
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  ngOnInit(): void {
     // push into list
     this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
        this.refererId = this.user._id;

        // get all user referers
        this.subscriptions.push(
          this.refererService.getUserReferers(this.user._id).subscribe((res) => {
            if (res.code === 200) {
              console.log(res.obj)
              //this.referers = res.obj;
            } else {
              this.noReferer = true;
            }
          }, (error) => {
            this.noReferer = true;
          })
        )
      })
    )

    

    //this.domain = this.document.location.hostname;
    //console.log(this.domain);
  }

  onChange() {
    if (this.isChecked) {
      this.refererId = this.user.username;
    } else {
      this.refererId = this.user._id
    }
  } 

}
