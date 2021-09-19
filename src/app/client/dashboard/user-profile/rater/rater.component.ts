import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'async-rater',
  styles: [`
    section {
      height: inherit;
      padding: 1em;
      border: 1px solid #ddd;
      .current-rating {

      }
      .rate {
        button {
          margin-left: 1em;
          mat-icon {
            margin: auto 0;
            font-size: 20px;
            text-align: center;
          }
        }
      }
    }
  `],
  template: `
    <section fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutAlign="space-between center" fxLayoutGap="1em">
      <div class="current-rating">
        CURRENT RATING: 50%
      </div>
      <div class="rate">
        <button mat-stroked-button color="primaryX" matTooltip="Rate up">
          <mat-icon>thumb_up</mat-icon>
        </button>
        <button mat-stroked-button color="warnX" matTooltip="Rate down">
          <mat-icon>thumb_down</mat-icon>
        </button>
        <button mat-stroked-button color="warnX" matTooltip="Report user for abuse">
          REPORT
        </button>
      </div>
    </section>
  `
})
export class RaterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
