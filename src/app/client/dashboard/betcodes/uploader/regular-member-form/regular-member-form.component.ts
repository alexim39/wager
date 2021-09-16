import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { BetcodesService, BetcodesInterface } from '../../betcodes.service';
import { FormResetterService } from 'src/app/core/form-resetter.service';


@Component({
  selector: 'async-form',  
  styles: [`
    section {
      p {
        text-align: center;
        font-weight: bold;
        color: orange;
      }
      mat-card {
        padding: 3em;
        form {
          mat-form-field {
            width: 100%;
          }
        }
      }
    }
  `],
  template: `
    <section *ngIf="!isActive">
      <p>Your account is not yet activated. Activate to continue</p>
    </section>

    <section *ngIf="isActive">
      <mat-card>
        <h1>Bet Code Upload Form</h1>
        <form [formGroup]="codeUploadForm" (ngSubmit)="onSubmit(codeUploadForm.value)" fxLayout="column" fxLayoutAlign="center center" fxLayoutGap="1em">

          <mat-form-field>
            <mat-label>Bookmaker</mat-label>
            <mat-select formControlName="bookmaker">
              <mat-option></mat-option>
              <mat-option value="bet9ja">
                Bet9ja
              </mat-option>
              <mat-option value="bangbet">
                Bangbet
              </mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Code</mat-label>
            <input matInput formControlName="code" placeholder="53KTVCG">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Odd</mat-label>
            <input matInput formControlName="odd" placeholder="1.09">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Start Date</mat-label>
            <input type="date" matInput formControlName="startDate">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Start Time</mat-label>
            <input type="time" matInput formControlName="startTime">
          </mat-form-field>

          <mat-form-field>
            <mat-label>End Date</mat-label>
            <input type="date" matInput formControlName="endDate">
          </mat-form-field>

          <mat-form-field>
            <mat-label>End Time</mat-label>
            <input type="time" matInput formControlName="endTime">
          </mat-form-field>

          <button [disabled]="codeUploadForm.invalid || isSpinning" mat-flat-button color="accent">
          <div class="loader" *ngIf="isSpinning"></div>
            UPLOAD
          </button>

        </form>
      </mat-card>
    </section>
  `
})
export class RegularMemberFormComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  codeUploadForm: FormGroup;
  user: UserInterface;
  isActive: boolean;
  isSpinning: boolean = false;

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private titleService: Title,
    private route: ActivatedRoute,
    private setcodesService: BetcodesService,
    private formResetterService: FormResetterService
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
   }

  ngOnInit(): void {
    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
        this.isActive = this.user.isActive;
      })
    )

    this.codeUploadForm = new FormGroup({
      bookmaker: new FormControl(null, {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      code: new FormControl(null, {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      odd: new FormControl(null, {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      startDate: new FormControl(null, {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      startTime: new FormControl(null, {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      endDate: new FormControl(null, {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      }),
      endTime: new FormControl(null, {
        validators:
          [
            Validators.required,
          ], updateOn: 'change'
      })
    })
  }

  private padWithZero(n: number) {
    return (n < 10) ? ("0" + n) : n;
  }

  private getFormattedDate(dateString: string | Date) {

    const D = new Date(dateString); 
    const month  = D.getMonth() + 1  // 10 (PS: +1 since Month is 0-based)
    const day = D.getDate()       // 30
    const year = D.getFullYear()   // 2020 

    // pad month value
    const padMonth = this.padWithZero(month)
    return padMonth + '/' + day + '/' + year;
  }

  onSubmit(codeObj: BetcodesInterface): void{
    if (!confirm("Have you confirmed all values inputed have no errors?")) {
      return null;
    } else {
      this.isSpinning = true;

      // format dates to mm/dd/yyyy
      codeObj['startDate'] = this.getFormattedDate(codeObj.startDate);
      codeObj['endDate'] = this.getFormattedDate(codeObj.endDate);
      codeObj['endDate'] = this.getFormattedDate(codeObj.endDate);
      codeObj['creator'] = this.user._id;
      codeObj['outcome'] = 'pending';

      // push into list
      this.subscriptions.push(
        this.setcodesService.create(codeObj).subscribe((res) => {
            if (res.code === 200) {
                this.snackBar.open(`${res.msg}`, `Close`, {
                    duration: 4000,
                    panelClass: ['success']
                });

                // reset form
                this.formResetterService.reset(this.codeUploadForm);
                this.isSpinning = false;
            }
        }, (error) => {
            this.snackBar.open(`${error.error.msg}`, `Close`, {
                duration: 4000,
                panelClass: ['error']
            });
            this.isSpinning = false;
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
