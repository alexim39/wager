import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TrippleOddInterface } from '../tab.service';
import { TabClass } from '../tab.class';
import { MatDialog } from '@angular/material/dialog';
import { GameMarginDialogComponent } from '../game-margin-dialog/game-margin-dialog.component';



@Component({
  selector: 'async-tripple-odd',
  templateUrl: './tripple-odd.component.html',
  styleUrls: ['./tripple-odd.component.scss', './tripple-odd.mobile.scss']
})
export class TrippleOddComponent extends TabClass {

   

 /*  // init subscriptions list
  subscriptions: Subscription[] = [];
  form: FormGroup;
  displayArea: boolean = false;
  isSpinning: boolean = false;
  toggleCheck: boolean = false;


  probabilityOfHomeWin: number;
  probabilityOfDrawWin: number;
  probabilityOfAwayWin: number;

  // init profit margin
  profitMargin: number;

  // init odd strength
  homeOddStrength: string;
  drawOddStrength: string;
  awayOddStrength: string;

  // init averageWin
  homeAverageWin: number;
  drawAverage: number;
  awayAverageWin: number;

  homeAverageGoals: number;
  awayAverageGoals: number;

  moreViewStatus: boolean = false; */

  constructor(
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    super();
  }

  //ngOnInit(): void {
    /* this.form = new FormGroup({
      homeOdd: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[0-9.]{1,5}')
          ], updateOn: 'change'
      }),
      drawOdd: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[0-9.]{1,5}')
            //this.ageValidator
          ], updateOn: 'change'
      }),
      awayOdd: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('[0-9.]{1,5}')
          ], updateOn: 'change'
      })
    }) */

  //}
  
/* 
  onSubmit(formObject: TrippleOddInterface): void {
    this.isSpinning = true;

    const homeImpliedProbability = super.getImpliedProbability(formObject.homeOdd);
    const drawImpliedProbability = super.getImpliedProbability(formObject.drawOdd);
    const awayImpliedProbability = super.getImpliedProbability(formObject.awayOdd);

    // total sum of implied probability (chances of winning)
    const totalImpliedProbability: number = homeImpliedProbability + drawImpliedProbability + awayImpliedProbability;

    // probability of home win
    this.probabilityOfHomeWin = super.round((homeImpliedProbability / totalImpliedProbability) * 100);
    // probability of draw win
    this.probabilityOfDrawWin = super.round((drawImpliedProbability / totalImpliedProbability) * 100);
    // probability of away win
    this.probabilityOfAwayWin = super.round((awayImpliedProbability / totalImpliedProbability) * 100);

    // odd strength
    this.homeOddStrength = super.getOddStrength(this.probabilityOfHomeWin);
    this.drawOddStrength = super.getOddStrength(this.probabilityOfDrawWin);
    this.awayOddStrength = super.getOddStrength(this.probabilityOfAwayWin);

    // call odd strength bar
    this.getHomeOddStrengthBar();
    this.getDrawOddStrengthBar();
    this.getAwayOddStrengthBar();

    // call get margin
    this.getGameMargin(formObject);

    // get average win (6 times play)
    this.homeAverageWin = Math.round((this.probabilityOfHomeWin * 6) / 100) * 10 / 10;
    this.drawAverage = Math.round((this.probabilityOfDrawWin * 6) / 100) * 10 / 10;
    this.awayAverageWin = Math.round((this.probabilityOfAwayWin * 6) / 100) * 10 / 10;

    // get average goals (over 2.5)
    //const drawAverageGoals: number = (this.probabilityOfDrawWin * 3) / 100
    const homeAverageGoals = (this.probabilityOfHomeWin * 3) / 100 //+ drawAverageGoals;
    const awayAverageGoals = (this.probabilityOfAwayWin * 3) / 100 //+ drawAverageGoals;

    this.homeAverageGoals = Math.round(homeAverageGoals) * 10 / 10;
    this.awayAverageGoals = Math.round(awayAverageGoals) * 10 / 10;

    // show display area
    this.displayArea = true;
    // stop spinniner
    this.isSpinning = false;
    // remove the more analysis panel
    this.toggleCheck = false;
    this.moreViewStatus = false;
  } */

  /* getGameMargin(formObject: TrippleOddInterface): void {
    
    // Use implied probablity to cal. profit margin
    // formular: Margin = (1/Home Odds) + (1/Away Odds) + (1/Draw Odds) – 1 
    
    const gameMargin: number = (super.getImpliedProbability(formObject.homeOdd) + super.getImpliedProbability(formObject.drawOdd) + super.getImpliedProbability(formObject.awayOdd)) - 1;
    this.profitMargin = this.round(gameMargin * 100)
  }

  getHomeOddStrengthBar() {
    return super.getProgressBarWidth(this.probabilityOfHomeWin);
  }

  getDrawOddStrengthBar() {
    return super.getProgressBarWidth(this.probabilityOfDrawWin);
  }

  getAwayOddStrengthBar() {
    return super.getProgressBarWidth(this.probabilityOfAwayWin);
  }

  ngOnDestroy(): void {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  openBookmakerMarginDialog(): void {
    this.dialog.open(GameMarginDialogComponent);
  }

  onViewMoreClick(): void {
    this.moreViewStatus = !this.moreViewStatus;     
  } */

  
}
