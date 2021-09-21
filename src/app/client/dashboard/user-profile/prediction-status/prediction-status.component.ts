import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/user.service';
import { BetcodesInterface, BetcodesService } from '../../betcodes/betcodes.service';
import { UserBetcodesAndProfileInterface, UserProfileService } from '../user-profile.service';
import { PredictionStatusClass } from './prediction-status.class';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'async-prediction-status',
  styles: [`
  aside {
    padding: 2em;
    background: whitesmoke;
    div {
      padding: 1em;
      .status-title {
        color: gray;
        text-align: center;
      }
    }
  }
  `],
  template: `
    <aside>
      <h1>{{foundUserProfile.lastname | titlecase}}'s Prediction Status</h1>
      <section fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutGap="0.5em">

        <div fxFlex><async-risk-level></async-risk-level></div>

        <div fxFlex fxLayout="column" fxLayout.sm="column" fxLayoutGap="0.5em">
          <canvas baseChart 
            [data]="pieChartData" 
            [labels]="pieChartLabels" 
            [chartType]="pieChartType"
            [options]="pieChartOptions"
            [plugins]="pieChartPlugins"
            [legend]="pieChartLegend">
          </canvas>
          <small class="status-title">Win/Lose percentage</small>
        </div>

        <div fxFlex><async-sport-knowledge></async-sport-knowledge></div>
      </section>
    </aside>

  
  `
})
export class PredictionStatusComponent extends PredictionStatusClass implements OnInit {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() userBetcodesAndProfile: UserBetcodesAndProfileInterface[] = [];
  foundUserProfile: UserInterface;
  @Input() currentUser: UserInterface;
  winnings: number = 0;
  loses: number = 0;
  otheroutcomes: number = 0;

  // Pie
  pieChartOptions: ChartOptions = {
    responsive: true,
  };
  pieChartLabels: Label[] = [['Wins'], ['Loses'], 'Others'];
  pieChartData: SingleDataSet = [];
  pieChartType: ChartType = 'pie';
  pieChartLegend = true;
  pieChartPlugins: any[] = [];

  constructor(
    private betcodesService: BetcodesService,
    private userProfileService: UserProfileService,
  ) { 
    super();
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  private getUserWinLose(betcodes: UserBetcodesAndProfileInterface[]) {
    // win percentage
    this.winnings = super.userWins(betcodes) * 100;
    // lose percentage
    this.loses = super.userLose(betcodes) * 100;
    // other outcomes percentage
    this.otheroutcomes = super.userOtherOutcomes(betcodes) * 100;
  }

  ngOnInit(): void {
    this.getUserWinLose(this.userBetcodesAndProfile)
    this.pieChartData = [this.winnings, this.loses, this.otheroutcomes];

    // found user
    this.foundUserProfile = this.userBetcodesAndProfile[0].creator;
  }

}
