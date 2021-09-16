import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BetcodesInterface, BetcodesService } from './../../../betcodes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'async-updater-dialog',
  template: `
    <section>
        <h2>UPDATE <span fxHide fxShow.gt-xs>OPTIONS FOR</span> {{data.bookmaker | uppercase}} {{data.code | uppercase}} CODE</h2>
        <div class="mat-body">
          <p>Select update type</p>
          <mat-radio-group [formControl]="outcomeLabelControl">
            <mat-list role="list">
              <mat-list-item role="listitem">
              <mat-radio-button value="pending">Pending</mat-radio-button>
              </mat-list-item>
              <mat-list-item role="listitem">
                <mat-radio-button value="won">Won</mat-radio-button>
              </mat-list-item>
              <mat-list-item role="listitem">
                <mat-radio-button value="lose">Lose</mat-radio-button>
              </mat-list-item>
              <mat-list-item role="listitem">
                <mat-radio-button value="void">Void</mat-radio-button>
              </mat-list-item>
            </mat-list>
          </mat-radio-group>
        </div>
        <div fxLayout.xs="column" fxLayout.xs="row" fxLayoutAlign="space-between center" fxLayoutGap="1em">
          <button [disabled]="isSpinning_update" (click)="updateCode()" mat-flat-button color="accent" fxFlex>
            <div class="loader" *ngIf="isSpinning_update"></div>
            UPDATE
          </button>

          <button [disabled]="isSpinning_delete" (click)="deleteCode(data._id)" mat-button color="warn" fxFlex>
            <div class="loader" *ngIf="isSpinning_delete"></div>
            DELETE
          </button>
        </div>
    <section>
  `,
  styles: [`
    section {
      p {
        color: gray;
      }
    }
  `]
})
export class UpdaterDialogComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  form: FormGroup;
  outcomeLabelControl = new FormControl(null);
  isSpinning_update: boolean = false;
  isSpinning_delete: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<UpdaterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BetcodesInterface,
    private fb: FormBuilder,
    private setcodesService: BetcodesService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      outcomeLabel: this.outcomeLabelControl,
    });
    //this.outcomeLabelControl = this.form.controls.outcomeLabel.value;
  }

  updateCode() {
    this.isSpinning_update = true;

    //console.log(this.form.controls.outcomeLabel.value)
    const updateObj = {
      id: this.data._id,
      outcome: this.form.controls.outcomeLabel.value
    }

    // push into list
    this.subscriptions.push(
      this.setcodesService.update(updateObj).subscribe((res) => {
          if (res.code === 200) {
              this.snackBar.open(`${res.msg}`, `Close`, {
                  duration: 4000,
                  panelClass: ['success']
              });

              // close dialog
              this.dialogRef.close();
              this.isSpinning_update = false;
          }
      }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['error']
          });
          this.isSpinning_update = false;
      })
    )
  }

  deleteCode(id: string): void {
    if (!confirm("You are about to permanently delete the code. Sure?")) {
      return null;
    } else {
      this.isSpinning_delete = true;
      // push into list
      this.subscriptions.push(
        this.setcodesService.delete(id).subscribe((res) => {
            if (res.code === 200) {
                this.snackBar.open(`${res.msg}`, `Close`, {
                    duration: 4000,
                    panelClass: ['success']
                });

                // close dialog
                this.dialogRef.close();
                this.isSpinning_delete = false;
            }
        }, (error) => {
            this.snackBar.open(`${error.error.msg}`, `Close`, {
                duration: 4000,
                panelClass: ['error']
            });
            this.isSpinning_delete = false;
        })
      )
    }
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
  }

}
