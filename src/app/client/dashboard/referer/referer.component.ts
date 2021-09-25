import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';


export interface PeriodicElement {
  user: string;
  no: number;
  signUpDate: string;
  bonusAmount: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
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
        <p>Send link to friends and get cash bonus when they subscribe</p>
        <p>http://wager.com.ng/r/{{refererId}}</p>
        <mat-slide-toggle [(ngModel)]="isChecked" (change)="onChange()">Show my username</mat-slide-toggle>
      </div>

      <div class="referer-list">
      <table mat-table [dataSource]="dataSource" class="mat-elevation-z0">
        <!-- Position Column -->
        <ng-container matColumnDef="no">
          <th mat-header-cell *matHeaderCellDef> NO. </th>
          <td mat-cell *matCellDef="let referer; let i = index;"> {{i + 1}} </td>
        </ng-container>

        <!-- Name Column -->
        <ng-container matColumnDef="user">
          <th mat-header-cell *matHeaderCellDef> USER </th>
          <td mat-cell *matCellDef="let referer"> {{referer.user}} </td>
        </ng-container>

        <!-- Weight Column -->
        <ng-container matColumnDef="signUpDate">
          <th mat-header-cell *matHeaderCellDef> SIGN UP DATE </th>
          <td mat-cell *matCellDef="let referer"> {{referer.signUpDate | date}} </td>
        </ng-container>

        <!-- Symbol Column -->
        <ng-container matColumnDef="bonusAmount">
          <th mat-header-cell *matHeaderCellDef> EARNED AMOUNT </th>
          <td mat-cell *matCellDef="let referer"> {{referer.bonusAmount | currency:'NIG':'&#8358;'}} </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="['no', 'user', 'signUpDate', 'bonusAmount']"></tr>
        <tr mat-row *matRowDef="let row; columns: ['no', 'user', 'signUpDate', 'bonusAmount'];"></tr>
        </table>
      </div>
    </section>
  `
})
export class RefererComponent implements OnInit {

  subscriptions: Subscription[] = [];
  user: UserInterface;
  refererId: string;
  isChecked: boolean = false;

  dataSource = ELEMENT_DATA;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private userService: UserService,
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }

  ngOnInit(): void {
     // push into list
     this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
        this.refererId = this.user._id
      })
    )
  }

  onChange() {
    if (this.isChecked) {
      this.refererId = this.user.username;
    } else {
      this.refererId = this.user._id
    }
  } 

}
