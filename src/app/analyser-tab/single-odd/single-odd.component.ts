import { Component } from '@angular/core';
import { TabClass } from '../tab.class';

@Component({
  selector: 'async-single-odd',
  templateUrl: './single-odd.component.html',
  styleUrls: ['./single-odd.component.scss', './single-odd.mobile.scss']
})
export class SingleOddComponent extends TabClass {

  impliedProbabilityValue: number;
  moreViewStatus: boolean = false;

  // init averageWin
  //averageWin: number;

  constructor() { 
    super()
  }

  getOddValue(oddValue: number): void {
    // show/hide moreViewStaus
    if (!oddValue) { this.moreViewStatus = false; }
    const impliedProbabilty: number = super.getImpliedProbability(oddValue);
    this.impliedProbabilityValue = impliedProbabilty * 100;

    // total sum of odds
    const totalOddSum: number = oddValue + 2.0;
    // probability of win
    const probabilityOfWin = super.round((2/totalOddSum) * 100);

    // get average win (5 times)
    //this.averageWin = Math.round((probabilityOfWin * 5) / 100) * 10 / 10
  }

  // Get progress bar CSS value
  getProgressBarWidth(): object {
    return super.getProgressBarWidth(this.impliedProbabilityValue);
  }

  onViewMoreClick(): void {
    this.moreViewStatus = !this.moreViewStatus;       
  }

  // Get odd strength value
  getOddStrength(): string {
    return super.getOddStrength(this.impliedProbabilityValue);
  }

}
