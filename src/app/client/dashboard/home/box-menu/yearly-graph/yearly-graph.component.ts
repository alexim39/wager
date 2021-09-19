import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { BetcodesService, BetcodesInterface } from '../../../betcodes/betcodes.service';
import { MonthlyProgressClass } from '../monthly-progress/monthly-progress.class';


@Component({
  selector: 'async-yearly-graph',
  styles: [`
    section {
      //background-color: whitesmoke;
    }
    .isEmptyResponse {
      text-align: center;
      padding: 3rem;
      color: orange;
    }
  `],
  template: `
    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
        </li>
        <li>yearly betcodes progress graph</li>
      </ul>
    </div>

    <section>
      <canvas baseChart
        height="25vh"
        width="80vw"
        [datasets]="barChartData"
        [labels]="barChartLabels"
        [options]="barChartOptions"
        [legend]="barChartLegend"
        [chartType]="barChartType" *ngIf="isEmptyResponse">
      </canvas>
      <div class="isEmptyResponse" *ngIf="!isEmptyResponse">
        No information found
      </div>
    </section>
  `
})
export class YearlyGraphComponent extends MonthlyProgressClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  winArray: number[] = [];
  loseArray: number[] = [];
  otherOutcomeArray: number[] = [];

  barChartOptions: ChartOptions = { 
    responsive: true,
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Percentage Rate'
        },
        ticks: {
          max: 100,
          min: 0,
          beginAtZero: true,
          stepSize: 10
        }
      }]
   } 
  };
  barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;

  barChartData: ChartDataSets[] = [
    {
      data: this.winArray,
      label: `Monthly betcode win for ${new Date().getFullYear()}`
    },
    {
      data: this.loseArray,
      label: `Monthly betcode lose for ${new Date().getFullYear()}`
    },
    {
      data: this.otherOutcomeArray,
      label: `Other (pending) outcomes for ${new Date().getFullYear()}`
    }
  ]

  isEmptyResponse: Boolean;

  // init
  janTotalWin: BetcodesInterface[] = [];
  janTotalLose: BetcodesInterface[] = [];
  janTotalBets: BetcodesInterface[] = [];
  janTotalOthers: BetcodesInterface[] = [];

  febTotalWin: BetcodesInterface[] = [];
  febTotalLose: BetcodesInterface[] = [];
  febTotalBets: BetcodesInterface[] = [];
  febTotalOthers: BetcodesInterface[] = [];

  marTotalWin: BetcodesInterface[] = [];
  marTotalLose: BetcodesInterface[] = [];
  marTotalBets: BetcodesInterface[] = [];
  marTotalOthers: BetcodesInterface[] = [];

  aprTotalWin: BetcodesInterface[] = [];
  aprTotalLose: BetcodesInterface[] = [];
  aprTotalBets: BetcodesInterface[] = [];
  aprTotalOthers: BetcodesInterface[] = [];

  mayTotalWin: BetcodesInterface[] = [];
  mayTotalLose: BetcodesInterface[] = [];
  mayTotalBets: BetcodesInterface[] = [];
  mayTotalOthers: BetcodesInterface[] = [];

  junTotalWin: BetcodesInterface[] = [];
  junTotalLose: BetcodesInterface[] = [];
  junTotalBets: BetcodesInterface[] = [];
  junTotalOthers: BetcodesInterface[] = [];

  julTotalWin: BetcodesInterface[] = [];
  julTotalLose: BetcodesInterface[] = [];
  julTotalBets: BetcodesInterface[] = [];
  julTotalOthers: BetcodesInterface[] = [];

  augTotalWin: BetcodesInterface[] = [];
  augTotalLose: BetcodesInterface[] = [];
  augTotalBets: BetcodesInterface[] = [];
  augTotalOthers: BetcodesInterface[] = [];

  sepTotalWin: BetcodesInterface[] = [];
  sepTotalLose: BetcodesInterface[] = [];
  sepTotalBets: BetcodesInterface[] = [];
  sepTotalOthers: BetcodesInterface[] = [];

  octTotalWin: BetcodesInterface[] = [];
  octTotalLose: BetcodesInterface[] = [];
  octTotalBets: BetcodesInterface[] = [];
  octTotalOthers: BetcodesInterface[] = [];

  novTotalWin: BetcodesInterface[] = [];
  novTotalLose: BetcodesInterface[] = [];
  novTotalBets: BetcodesInterface[] = [];
  novTotalOthers: BetcodesInterface[] = [];

  decTotalWin: BetcodesInterface[] = [];
  decTotalLose: BetcodesInterface[] = [];
  decTotalBets: BetcodesInterface[] = [];
  decTotalOthers: BetcodesInterface[] = [];

  constructor(
    private betcodesService: BetcodesService
  ) {
    super()
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

  ngOnInit(): void {
    // push into list
    this.subscriptions.push(
     // get current user details from data service
     this.betcodesService.betcodes().subscribe((res) => {
       if (res.code === 200) {
         // check empty response
         this.emptyResponse(res.obj);
         
        // loop through returned array of history
        res.obj.forEach((betcode: BetcodesInterface) => {
          this.getYearlyProgressByMonth(betcode);
        })
       }
     })
   )
 }

 private getYearlyProgressByMonth(betcode: BetcodesInterface) {

  // get for jan
  if (new Date(betcode.endDate).getMonth() == 0 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.janTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.janTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.janTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.janTotalOthers.push(betcode)
    }
  }

  // get for feb
  if (new Date(betcode.endDate).getMonth() == 1 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.febTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.febTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.febTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.febTotalOthers.push(betcode)
    }
  }

  // get for mar
  if (new Date(betcode.endDate).getMonth() == 2 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.marTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.marTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.marTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.marTotalOthers.push(betcode)
    }
  }

  // get for apr
  if (new Date(betcode.endDate).getMonth() == 3 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.aprTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.aprTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.aprTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.aprTotalOthers.push(betcode)
    }
  }

  // get for may
  if (new Date(betcode.endDate).getMonth() == 4 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.mayTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.mayTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.mayTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.mayTotalOthers.push(betcode)
    }
  }

  // get for jun
  if (new Date(betcode.endDate).getMonth() == 5 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.junTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.junTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.junTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.junTotalOthers.push(betcode)
    }
  }

  // get for jul
  if (new Date(betcode.endDate).getMonth() == 6 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.julTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.julTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.julTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.julTotalOthers.push(betcode)
    }
  }

  // get for aug
  if (new Date(betcode.endDate).getMonth() == 7 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.augTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.augTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.augTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.augTotalOthers.push(betcode)
    }
  }

  // get for sep
  if (new Date(betcode.endDate).getMonth() == 8 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.sepTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.sepTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.sepTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.sepTotalOthers.push(betcode)
    }
  }

  // get for oct
  if (new Date(betcode.endDate).getMonth() == 9 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.octTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.octTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.octTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.octTotalOthers.push(betcode)
    }
  }

  // get for nov
  if (new Date(betcode.endDate).getMonth() == 10 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.novTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.novTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.novTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.novTotalOthers.push(betcode)
    }
  }

  // get for dec
  if (new Date(betcode.endDate).getMonth() == 11 && new Date(betcode.endDate).getFullYear() == new Date().getFullYear()) {
    // get total bets
    this.decTotalBets.push(betcode);
    // total win
    if (betcode.outcome == 'won') {
      this.decTotalWin.push(betcode)
    }
    // total lose
    if (betcode.outcome == 'lose') {
      this.decTotalLose.push(betcode)
    }
    // other outcomes
    if (betcode.outcome !== 'lose' && betcode.outcome !== 'won') {
      this.decTotalOthers.push(betcode)
    }
  }

  // percentages
  this.winArray[0] = (this.janTotalWin.length / this.janTotalBets.length ) * 100;
  this.loseArray[0] = (this.janTotalLose.length / this.janTotalBets.length ) * 100;
  this.otherOutcomeArray[0] = (this.janTotalOthers.length / this.janTotalBets.length ) * 100;

  this.winArray[1] = (this.febTotalWin.length / this.febTotalBets.length ) * 100;
  this.loseArray[1] = (this.febTotalLose.length / this.febTotalBets.length ) * 100;
  this.otherOutcomeArray[1] = (this.febTotalOthers.length / this.febTotalBets.length ) * 100;

  this.winArray[2] = (this.marTotalWin.length / this.marTotalBets.length ) * 100;
  this.loseArray[2] = (this.marTotalLose.length / this.marTotalBets.length ) * 100;
  this.otherOutcomeArray[2] = (this.marTotalOthers.length / this.marTotalBets.length ) * 100;

  this.winArray[3] = (this.aprTotalWin.length / this.aprTotalBets.length ) * 100;
  this.loseArray[3] = (this.aprTotalLose.length / this.aprTotalBets.length ) * 100;
  this.otherOutcomeArray[3] = (this.aprTotalOthers.length / this.aprTotalBets.length ) * 100;

  this.winArray[4] = (this.mayTotalWin.length / this.mayTotalBets.length ) * 100;
  this.loseArray[4] = (this.mayTotalLose.length / this.mayTotalBets.length ) * 100;
  this.otherOutcomeArray[4] = (this.mayTotalOthers.length / this.mayTotalBets.length ) * 100;

  this.winArray[5] = (this.junTotalWin.length / this.junTotalBets.length ) * 100;
  this.loseArray[5] = (this.junTotalLose.length / this.junTotalBets.length ) * 100;
  this.otherOutcomeArray[5] = (this.junTotalOthers.length / this.junTotalBets.length ) * 100;

  this.winArray[6] = (this.julTotalWin.length / this.julTotalBets.length ) * 100;
  this.loseArray[6] = (this.julTotalLose.length / this.julTotalBets.length ) * 100;
  this.otherOutcomeArray[6] = (this.julTotalOthers.length / this.julTotalBets.length ) * 100;

  this.winArray[7] = (this.augTotalWin.length / this.augTotalBets.length ) * 100;
  this.loseArray[7] = (this.augTotalLose.length / this.augTotalBets.length ) * 100;
  this.otherOutcomeArray[7] = (this.augTotalOthers.length / this.augTotalBets.length ) * 100;

  this.winArray[8] = (this.sepTotalWin.length / this.sepTotalBets.length ) * 100;
  this.loseArray[8] = (this.sepTotalLose.length / this.sepTotalBets.length ) * 100;
  this.otherOutcomeArray[8] = (this.sepTotalOthers.length / this.sepTotalBets.length ) * 100;

  this.winArray[9] = (this.octTotalWin.length / this.octTotalBets.length ) * 100;
  this.loseArray[9] = (this.octTotalLose.length / this.octTotalBets.length ) * 100;
  this.otherOutcomeArray[9] = (this.octTotalOthers.length / this.octTotalBets.length ) * 100;

  this.winArray[10] = (this.novTotalWin.length / this.novTotalBets.length ) * 100;
  this.loseArray[10] = (this.novTotalLose.length / this.novTotalBets.length ) * 100;
  this.otherOutcomeArray[10] = (this.novTotalOthers.length / this.novTotalBets.length ) * 100;

  this.winArray[11] = (this.decTotalWin.length / this.decTotalBets.length ) * 100;
  this.loseArray[11] = (this.decTotalLose.length / this.decTotalBets.length ) * 100;
  this.otherOutcomeArray[11] = (this.decTotalOthers.length / this.decTotalBets.length ) * 100;
 }

 ngOnDestroy() {
   // unsubscribe list
   this.subscriptions.forEach(subscription => {
     subscription.unsubscribe();
   });
 }

}
