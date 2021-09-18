import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { BetcodesInterface, BetcodesService } from './betcodes.service';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { ServerResponse } from 'src/app/common/server/response.interface';
import { formatDate } from "@angular/common";

@Component({
  selector: 'async-betcodes',
  styles: [`
    section {
      .filter {
        background-color: white;
        height: 100%;
        padding: 1rem;
        margin-bottom: -2.5em;
        mat-form-field {
          width: 30%;
        }
      }
      table {
        width: 100%;
        margin-top: 2rem;
        img {
          height: 25px;
          width: 25px;
          border-radius: 50%;
          margin-bottom: -0.6em;
          border: 1px solid #ccc;
        }
        td {
          small {
            display: block;
            font-size: 0.6em;
          }
          .clickable {
            cursor: pointer;
          }
          .profile-img {
            display: block;
            margin-top: 3px;
            margin-left: 10px;
          }
          .profile-name{
            display: block;
            padding-top: 0.5em;
            font-size: 0.8em;
            color: gray;
          }
        }
      }  
      .won {
        color: #32cd32;
      }
      .lose {
        color: red;
      }
      .expired {
        text-decoration: line-through;
      }     
    }
    .no-subscription {
        text-align: center;
      p {
        color: orange;
        margin: 2em;
        font-weight: bold;
      }
    } 
    /* for tablet */
    @media only screen and (max-width:800px) {
      section {
        .filter {
          mat-form-field {
            width: 100%;
          }
        }
      }
    }
    /* for mobile */
    @media only screen and (max-width:500px) {
      section {
        .filter {
          mat-form-field {
            width: 100%;
          }
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
        <li>Game predictions</li>
        <li>weekly prediction</li>
      </ul>
    </div>

    <!-- active subscription -->
    <!-- <aside *ngIf="subscriptionRemainingDays > 0"> -->
    <aside>
      <div *ngIf="betcodesService.showSpinner | async" fxLayout="column" fxLayoutAlign="space-between center" fxLayoutGap="1em" style="color: gray;">
        <mat-progress-bar mode="indeterminate"></mat-progress-bar>
        <span>Loading...</span>
      </div>
      <section *ngIf="!(betcodesService.showSpinner | async)">
        <div class="filter mat-elevation-z8">
          <mat-form-field>
            <mat-label>Search Table</mat-label>
            <input matInput (keyup)="applyFilter($event)" #input>
          </mat-form-field>
        </div>
        <table mat-table [dataSource]="betcodes" matSort class="mat-elevation-z8">

          <ng-container matColumnDef="bookmaker">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> BOOKMAKER </th>
            <td mat-cell *matCellDef="let bet">
              <img [src]="bookmakerLogo"/> {{bet.bookmaker | titlecase}} 
            </td>
          </ng-container>

          <ng-container matColumnDef="code">
            <th mat-header-cell *matHeaderCellDef> CODE </th>
            <td mat-cell *matCellDef="let bet"> 
              {{bet.code}}
              <!-- <span class="clickable" matTooltip="View games in code"> {{bet.code}} </span> -->
            </td>
          </ng-container>

          <ng-container matColumnDef="odd">
            <th mat-header-cell *matHeaderCellDef> ODD </th>
            <td mat-cell *matCellDef="let bet"> &#8776;{{bet.odd}} </td>
          </ng-container>

          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef mat-sort-header> STATUS </th>
            <td mat-cell *matCellDef="let bet"> 
              {{bet.status | sentencecase}}
              <small>{{getStatus(bet)}} </small>
            </td>
          </ng-container>

          <ng-container matColumnDef="outcome">
            <th mat-header-cell *matHeaderCellDef> OUTCOME </th>
            <td mat-cell *matCellDef="let bet"> {{bet.outcome | titlecase}} </td>
          </ng-container>

          <ng-container matColumnDef="createDate">
            <th mat-header-cell *matHeaderCellDef> POST DATE </th>
            <td mat-cell *matCellDef="let bet"> {{bet.createDate | date}} </td>
          </ng-container>

          <ng-container matColumnDef="owner">
            <th mat-header-cell *matHeaderCellDef> OWNER </th>
            <td matTooltip="View {{bet.creator.lastname | titlecase}}'s profile" (click)="loadUserProfile(bet.creator)" mat-cell *matCellDef="let bet"> 
              <img class="profile-img clickable" [src]="profileImg"/>
              <div fxHide fxShow.gt-sm class="profile-name clickable">{{bet.creator.lastname | titlecase}} {{bet.creator.firstname | titlecase}}</div>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row [ngClass]="{ 'won': wonBet(bet.outcome), 'lose': losedBet(bet.outcome), 'expired': expiredBet(bet.status) }" *matRowDef="let bet; columns: displayedColumns;"></tr>
        </table>
        <mat-paginator [length]="100" [pageSize]="10" [pageSizeOptions]="[20, 45, 60, 100]"></mat-paginator>
      </section>
    </aside>

    <!-- no active subscription -->
    <!-- <aside class="no-subscription" *ngIf="subscriptionRemainingDays <= 0">
      <p>You don't have an active subscription plan</p>

      <a mat-flat-button color="accent" [routerLink]="['/dashboard/subscriptions']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Click here to subscribe</a>
    </aside> -->
  `
})
export class BetcodesComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  betcodes: MatTableDataSource<BetcodesInterface>;
  bookmakerLogo: string = "./assets/img/bet9ja.png";
  profileImg: string = "./assets/img/profile.jpg";

  displayedColumns: string[] = ['bookmaker', 'code', 'odd', 'status', 'outcome', 'createDate', 'owner'];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  subscriptionRemainingDays: number = 0;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    public betcodesService: BetcodesService,
    private userService: UserService,
    private router: Router,
  ) { 
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )

    this.getBetcodes();
  }


  private getBetcodes(): void {
    // push into list
    this.subscriptions.push(
      this.betcodesService.betcodes().subscribe((res) => {
        if (res.code === 200) {

          // check empty response
          //this.emptyResponse(res.obj);

          setTimeout(() => this.betcodes.paginator = this.paginator);
          setTimeout(() => this.betcodes.sort = this.sort);

          // sort arrays by date to return recent first
          const sortedResult = res.obj.sort((a: BetcodesInterface, b: BetcodesInterface) => {
            return <any>new Date(b.createDate) - <any>new Date(a.createDate);
          });

          this.betcodesService.betcodesStatus(sortedResult);

          // Assign the data to the data source for the table to render
          this.betcodes = new MatTableDataSource(sortedResult);
        }
      })
    )
  }

  // apply filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.betcodes.filter = filterValue.trim().toLowerCase();

    if (this.betcodes.paginator) {
      this.betcodes.paginator.firstPage();
    }
  }

  wonBet(outcome: string): boolean {
    if (outcome === 'won') {
      return true;
    } else {
      return false;
    }
  }

  losedBet(outcome: string): boolean {
    if (outcome === 'lose') {
      return true;
    } else {
      return false;
    }
  }

  expiredBet(status: string): boolean {
    if (status === 'Expired') {
      return true;
    } else {
      return false;
    }
  }

  getStatus(bet: BetcodesInterface): string {
    const dateFormat = 'MMM d, y';
    //const timeFormat = 'h:mm a';
    const locale = 'en-US';

    // check if its expired
    if (bet.status === 'Expired') {
      return `Expired on ${formatDate(new Date(bet.endDate), dateFormat, locale)}`;
    }
    if (bet.status === 'Not started') {
      return `Starting on ${formatDate(new Date(bet.startDate), dateFormat, locale)} by ${bet.startTime}`;
    } else {
      return null;
    }
  }

  loadUserProfile(user: UserInterface) {
    // redirect to dashboard
    this.router.navigate(['/dashboard/'+user.username]);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
