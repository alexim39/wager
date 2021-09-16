import { Component, OnInit, Input, ElementRef, OnDestroy } from '@angular/core';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ViewPredictionClass } from './view-prediction.class';
import { ServerResponse } from 'src/app/common/server/response.interface';

@Component({
  selector: 'async-veiw-prediction',  
  styles: [`
    section {
      width: 100%;
      aside {
        div {
          p {
            color: gray;
          }
        }
      }
    }
    /* For tablet */
    @media screen and (max-width: 800px) {}
    /* For mobile */
    @media screen and (max-width: 500px) {}
  `],
  template: `
    <section fxLayout="column" fxLayoutAlign="space-between center" fxLayoutGap="1em">

      <!--<button [disabled]="subscriptionRemainingDays <= 0 || isSpinning || isDisabled" (click)="viewPrediction()" mat-flat-button color="accent"> -->
      <button [disabled]="isSpinning || isDisabled" (click)="viewPrediction()" mat-flat-button color="accent">
        <div class="loader" *ngIf="isSpinning"></div>
        VIEW PREDICTION
      </button>

      <aside *ngIf="showPredictions" fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutAlign="space-between center" fxLayoutGap="1em">

        <div>
          <!-- <h2>System Prediction</h2> -->
          <p>System generated
            <span *ngIf="doubleChance">double chance market:</span>
            <span *ngIf="overAndUnder">over/under market:</span>
            <span *ngIf="directWin">direct win market:</span>
          </p>
          {{doubleChance | uppercase}}
          {{overAndUnder | uppercase}}
          {{directWin | uppercase}}
        </div>

      </aside>

    </section>
  `
})
export class VeiwPredictionComponent extends ViewPredictionClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  isSpinning: boolean = false;
  showPredictions: boolean = false;
  isDisabled: boolean = false;

  @Input() homeTeamRefId: ElementRef;
  @Input() homeTeamName: string;
  @Input() supposedHomeOdd: number;
  @Input() probabilityOfHomeWin: number;
  @Input() homeOddStrength: string;

  @Input() probabilityOfDrawWin: number;

  @Input() awayTeamRefId: ElementRef;
  @Input() awayTeamName: string;
  @Input() supposedAwayOdd: number;
  @Input() probabilityOfAwayWin: number;
  @Input() awayOddStrength: string;

  subscriptionRemainingDays: number = 0;

  /* Predections */
  directWin: string;
  doubleChance: string;
  overAndUnder: string;

  constructor(  ) {
    super()
  }

  ngOnInit(): void {
    const homeTeamId: number = this.homeTeamRefId.nativeElement.value;
    const awayTeamId: number = this.awayTeamRefId.nativeElement.value;
  }

  viewPrediction(): void {
    this.isSpinning = true;
    this.showPredictions = true;

    // Get the team with greater strength
    const favouriteTeam: number = super.favouriteTeam(this.probabilityOfHomeWin, this.probabilityOfAwayWin);
    // set the direct win tip
    this.directWin =  super.getDirectWinTeam(
      favouriteTeam, 
      this.homeTeamName, 
      this.awayTeamName, 
      this.probabilityOfHomeWin, 
      this.probabilityOfAwayWin
    );

    // set double chance tips
    this.doubleChance = super.getDoubleChanceTeam(
      favouriteTeam, 
      this.homeTeamName, 
      this.awayTeamName, 
      this.probabilityOfHomeWin, 
      this.probabilityOfAwayWin
    );

    // set over and under tip
    this.overAndUnder = super.getOverAndUnder(this.probabilityOfHomeWin, this.probabilityOfAwayWin)

    this.isSpinning = false;
    this.isDisabled = true;
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
