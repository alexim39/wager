import { Component } from '@angular/core';

@Component({
  selector: 'async-tab',
  template: `
    <section class="mat-h1" id="odd-analyser">Enter Teams from Betting Sites</section>
    <mat-tab-group dynamicHeight mat-align-tabs="center">
      <mat-tab label="1X2 MARKET"> <div><async-tripple-odd></async-tripple-odd></div> </mat-tab>
      <mat-tab label="12 OR OVER/UNDER MARKET"> <div><async-double-odd></async-double-odd> </div></mat-tab>
      <mat-tab label="SINGLE ODD"> <div><async-single-odd></async-single-odd></div> </mat-tab>
    </mat-tab-group>
  `,
  styles: [`
    .mat-h1 {
      padding: 1em 0;
      text-align: center;
    }
    mat-tab-group {
      div {
        min-height: calc(100% - 64px);
        margin-top: 2em;
      }
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      .mat-h1 {
        padding: 1em 0;
        font-size: 1em;
        font-weight: bold;
      }
    }
  `]
})
export class TabComponent  {

  constructor() { }

}
