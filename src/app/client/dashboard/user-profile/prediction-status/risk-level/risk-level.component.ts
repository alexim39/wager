import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/user.service';
import { UserBetcodesAndProfileInterface } from '../../user-profile.service';
import { PredictionStatusClass } from '../prediction-status.class';

@Component({
  selector: 'async-risk-level',  
  styles: [`
    div {
      padding: 1em;
      .status-title {
        color: gray;
        text-align: center;
      }
      .skill-bar {
        display: flex;
        align-content: center;
        align-items: center;
        mat-progress-bar {
          height: 20px;
        }
        .value {
          position: absolute; 
          padding: 10px 10px 10px 40px; 
          color: black;
          font-size: 10px;
          font-weight: bold;
        }
      }
    }
  `],
  template: `
    <div fxLayout="column" fxLayout.sm="column" fxLayoutGap="0.5em">
      <div class="skill-bar" fxLayout="row" fxLayoutGap="0.5em" matTooltip="{{risklevel}}% risk level">
        <small>Low</small>
        <mat-progress-bar mode="determinate" [value]="risklevel" [ngClass]="getBarColor()"></mat-progress-bar>
        <small>High</small>
        <span class="value"> {{risklevel}}% </span>
      </div>
      <small class="status-title">Risk Level</small>
    </div>
  `
})
export class RiskLevelComponent extends PredictionStatusClass  implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  risklevel: number = 0;
  @Input() userBetcodesAndProfile: UserBetcodesAndProfileInterface[] = [];
  foundUserProfile: UserInterface;
  @Input() currentUser: UserInterface;
  userBetOdds: Array<number> = [];
  userBetOddsAboveStandard: Array<number> = [];


  constructor() { 
    super()
  }

  ngOnInit(): void {
    // found user
    this.foundUserProfile = this.userBetcodesAndProfile[0].creator;
    this.getUserBetOdds(this.userBetcodesAndProfile);
  }

  // get all user bet odds
  private getUserBetOdds(userBetcodesAndProfile: UserBetcodesAndProfileInterface[]) {
    userBetcodesAndProfile.forEach((userbetodds) => {
      this.userBetOdds.push(+userbetodds.odd);
    })

    // set above standard odd
    this.getUserBetOddsAboveStandard(this.userBetOdds)
  }

  // get all user bet odd above standard
  private getUserBetOddsAboveStandard(userBetOdds: number[]) {
    userBetOdds.forEach((userbetodds) => {
      if (userbetodds > 2.50) {
        this.userBetOddsAboveStandard.push(userbetodds);
      }
    })
    // set risklevel
    this.setRiskLevel()
  }

  private setRiskLevel(){
    let totalSumOfOdds: number = 0;
    this.userBetOddsAboveStandard.forEach((odds) => {
      totalSumOfOdds = totalSumOfOdds + odds;
    })
    this.risklevel = +( totalSumOfOdds / (this.userBetcodesAndProfile.length) ).toFixed(0)
  }

  getBarColor () {
    return super.getProgressBarWidth(this.risklevel)
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
  }

}
