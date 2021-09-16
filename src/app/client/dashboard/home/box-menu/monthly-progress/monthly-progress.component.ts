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
      padding: 0 1em;
      mat-icon {
        font-size: 2.5rem;
        margin-top: 0.5rem;
      }
      span {
        font-size: 1.5rem;
        margin-top: 1.5rem;
      }
    }
    mat-card-footer {
      background-color: rgb(207, 208, 202);
      width: 100%;
      color: black;
      padding: 1rem;
      text-align: center;
    }
  }
  `],
  template: `
    <mat-card fxLayout="column" fxLayoutAlign="space-around center">
      <mat-card-content fxLayoutAlign="center center" fxLayoutGap="1.5rem">
        <mat-icon>show_chart</mat-icon>
        <span> {{monthlyWin}}% Wining</span>
      </mat-card-content>
      <mat-card-footer fxLayoutAlign="center center">Win percentage as at {{currentMonth}}</mat-card-footer>
    </mat-card>
  `
})
export class MonthlyProgressComponent extends MonthlyProgressClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  monthlyWin: number = 0;
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
          this.monthlyWin = super.currentMonthWinsPercentage(res.obj)
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
