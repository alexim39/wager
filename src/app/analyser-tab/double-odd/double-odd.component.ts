import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DoubleOddInterface } from '../tab.service';
import { TabClass } from '../tab.class';
import { MatDialog } from '@angular/material/dialog';
import { GameMarginDialogComponent } from '../game-margin-dialog/game-margin-dialog.component';

@Component({
  selector: 'async-double-odd',
  templateUrl: './double-odd.component.html',
  styleUrls: ['./double-odd.component.scss', './double-odd.mobile.scss']
})
export class DoubleOddComponent extends TabClass implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  form: FormGroup;
  displayArea: boolean = false;
  isSpinning: boolean = false;

  probabilityOfHomeWin: number;
  probabilityOfAwayWin: number;

  // init profit margin
  profitMargin: number;

  // init odd strength
  homeOddStrength: string;
  awayOddStrength: string;

  // init averageWin
  homeAverageWin: number;
  awayAverageWin: number;

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    super()
   }

  onSubmit(formObject: DoubleOddInterface): void {
    this.isSpinning = true;

    // total sum of odds
    const totalOddSum: number = formObject.homeOdd + formObject.awayOdd;

    // probability of home win
    this.probabilityOfHomeWin = super.round((formObject.awayOdd/totalOddSum) * 100);
    // probability of away win
    this.probabilityOfAwayWin = super.round((formObject.homeOdd/totalOddSum) * 100);

    // odd strength
    this.homeOddStrength = super.getOddStrength(this.probabilityOfHomeWin);
    this.awayOddStrength = super.getOddStrength(this.probabilityOfAwayWin);

    // call odd strength bar
    this.getHomeOddStrengthBar();
    this.getAwayOddStrengthBar();

    // call get margin
    this.getGameMargin(formObject);

    // get average win (5 times)
    this.homeAverageWin = Math.round((this.probabilityOfHomeWin * 6) / 100) * 10 / 10
    this.awayAverageWin = Math.round((this.probabilityOfAwayWin * 6) / 100) * 10 / 10

    // show display area
    this.displayArea = true;
    // stop spinniner
    this.isSpinning = false;
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      homeOdd: new FormControl('', {validators: 
        [
          Validators.required,
          Validators.pattern('[0-9.]{1,5}')
        ], updateOn: 'change'
      }),
      awayOdd: new FormControl('', {validators: 
        [
          Validators.required, 
          Validators.pattern('[0-9.]{1,5}')
        ], updateOn: 'change' 
      })
    })
  }

  getGameMargin(formObject: DoubleOddInterface): void {
    /* 
      Use implied probablity to cal. profit margin
      formular: Margin = (1/Home Odds) + (1/Away Odds) + (1/Draw Odds) – 1 
    */
    const gameMargin: number = (super.getImpliedProbability(formObject.homeOdd) + super.getImpliedProbability(formObject.awayOdd)) - 1;
    this.profitMargin = this.round(gameMargin * 100)
  }

  getHomeOddStrengthBar() {
    return super.getProgressBarWidth(this.probabilityOfHomeWin);
  }

  getAwayOddStrengthBar() {
    return super.getProgressBarWidth(this.probabilityOfAwayWin);
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  openMarginDialog(): void {
    this.dialog.open(GameMarginDialogComponent);
  }
}
