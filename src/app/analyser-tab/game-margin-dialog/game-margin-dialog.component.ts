import { Component } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';


@Component({
    selector: 'async-game-margin-dialog',
    template: `
      <h1 mat-dialog-title>Meaning Of Bookmaker Odd Margin</h1>
      <div mat-dialog-content>
        <p>
          The margin a bookmaker applies on the betting odds is one information a bettor should know in order to increase long-term profits, 
          with lower margins favoring the bettor and larger margins eating into bettor profits.
        </p>

        <p>
          To get a better margin, compare the odds given by different bookmakers. The bookmarker with lowest margin will result to higer profit.
        </p>

        <p>
          NOTE: The margin is the percentage deducted from the bettor, in spite of game outcome.
        </p>

      </div>
      <div mat-dialog-actions align="end">
        <button mat-button mat-dialog-close (click)="onClose()">Close</button>
      </div>
    `,
    styles: [``]
  })
  export class GameMarginDialogComponent {
  
    constructor(
      private dialogRef: MatDialogRef<GameMarginDialogComponent>
    ) {}
  
    onClose(): void {
      this.dialogRef.close();
    }
  
}