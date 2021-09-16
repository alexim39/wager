import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'async-bet-value-dialog',
  template: `
    <h1 mat-dialog-title>Supposed Odd For {{data.market}}</h1>
      <div mat-dialog-content>
        <p>
          Supposed odd ({{data.oddValue}}) is our system proposed odd generated for a bet on {{data.market | uppercase}} when {{data.homeTeamName}} plays with {{data.awayTeamName}}.
        </p>

        <p>
          NOTE: The system generated odds will most often be different from Bookmakers's odd. This is due to the profit margin added by Bookmakers on their odds.
        </p>

      </div>
      <div mat-dialog-actions align="end">
        <button mat-button mat-dialog-close (click)="onClose()">Close</button>
      </div>
  `,
  styles: [
  ]
})
export class SupposedOddDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<SupposedOddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {oddValue: number, market: string, homeTeamName: string, awayTeamName: string}
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

}
