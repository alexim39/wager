import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerResponse } from 'src/app/common/server/response.interface';
import { UserInterface } from 'src/app/core/user.service';
import { BetcodesService, BetcodesInterface } from '../../../betcodes/betcodes.service';
import { BoxMenuService } from '../box-menu.service';
import { MonthlyProgressClass } from './monthly-progress.class';

@Component({
  selector: 'async-monthly-progress',
  styles: [`
    mat-card {
    width: 100%;
    height: 5rem;
    padding: 2rem 0 0 0;
    font-family: monospace;
    color: rgb(100, 100, 100);
    mat-card-content {
      padding: 2em 1em 0 1em;
      mat-icon {
        font-size: 2em;
        margin-top: 0.5rem;
      }
      span {
        font-size: 1.2em;
        margin-top: 1em;
        font-weight: bold;
      }
      .win {
        color: green;
      }
      .lose {
        color: red;
      }
    }
    mat-card-footer {
      background-color: rgb(207, 208, 202);
      width: 100%;
      color: black;
      padding: 1em 1em 0.5em 1em;
      text-align: center;
      a {
        margin-top: 0.5em;
      }
    }
  }
  /* for tablet */
  @media only screen and (max-width:800px) {
    mat-card {
      mat-card-content {
        span {
          font-size: 0.9em;
        }
      }
    }
  }
  /* for mobile */
  @media only screen and (max-width:500px) {
    mat-card {
      mat-card-content {
        padding-top: 3em;
        span {
          font-size: 0.8em;
        }
      }
    }
  }
  `],
  template: `
    <mat-card fxLayout="column" fxLayoutAlign="space-around center">
      <mat-card-content fxLayoutAlign="center center" fxLayoutGap="1.5rem">
        <mat-icon>leaderboard</mat-icon>
        <span class="win"> {{monthlyWin}}% Win</span>
        <span class="lose"> <span fxHide fxShow.gt-xs>|</span> {{monthlyLose}}% Lose</span>
        <span class="other-outcome"> <span fxHide fxShow.gt-xs>|</span> {{monthlyOtherOutcomes}}% <span fxHide fxShow.gt-sm>Others</span> (Pending)</span> 
      </mat-card-content>
      <mat-card-footer fxLayout="column" fxLayoutAlign="center center">
        Betcodes percentage status for {{currentMonth}}
        <a [routerLink]="['/dashboard/yearly-progress-graph']" mat-stroked-button><small>View year</small></a>
      </mat-card-footer>
    </mat-card>
  `
})
export class MonthlyProgressComponent extends MonthlyProgressClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  monthlyWin: number = 0;
  monthlyLose: number = 0;
  monthlyOtherOutcomes: number = 0;
  // get current month
  currentMonth = new Date().toLocaleString('default', { month: 'long' }) + ',' + new Date().getFullYear();

  constructor(
    private betcodesService: BetcodesService
  ) { 
    super();
  }

  ngOnInit(): void {
     // push into list
     this.subscriptions.push(
      // get current user details from data service
      this.betcodesService.betcodes().subscribe((res) => {
        if (res.code === 200) {
          this.monthlyWin = +super.currentMonthWinsPercentage(res.obj).toFixed(2);
          this.monthlyLose = +super.currentMonthLosedPercentage(res.obj).toFixed(2);
          this.monthlyOtherOutcomes = +super.currentMonthOtherOutcomePercentage(res.obj).toFixed(2);
        }
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
