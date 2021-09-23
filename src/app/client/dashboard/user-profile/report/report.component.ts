import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { ReportInterface, ReportService } from './resport.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormResetterService } from 'src/app/core/form-resetter.service';

@Component({
  selector: 'async-report',
  styles: [`
    mat-card {
      mat-card-content {
        padding: 2em;
        form {
          width: 100%;
          mat-card-footer {
            button {
              margin-right: 1em;
            }
          }
        }
      }
      mat-card-footer {
        padding: 2em;
      }
    }
  `],
  template: `
    <h1>
      Report User
    </h1>
    <!-- <p>
      Inconsistent report of betcode outcome
    </p> -->

    <mat-card>  
      <mat-card-content>
        <form [formGroup]="reportForm" (ngSubmit)="onSubmit(reportForm.value)" fxLayout="column" fxLayoutGap="1em">
          <mat-form-field>
            <mat-label>What would you like to tell us about this user?</mat-label>
            <mat-select formControlName="tellUsAboutUser">
              <mat-option value="Something that I like about this user">Something that you like about the user</mat-option>
              <mat-option value="Something that I do not like about this user">Something that you do not like about the user</mat-option>
              <mat-option value="Complain">Complain</mat-option>
              <mat-option value="General comments">General comments</mat-option>
            </mat-select>
            </mat-form-field>

            <mat-form-field>
            <mat-label>Tell us more about this user behaviour</mat-label>
            <textarea matInput formControlName="reportMsg"></textarea>
            </mat-form-field>

            <mat-slide-toggle color="accent" formControlName="reply">Would you like us to respond?</mat-slide-toggle>
          <mat-card-footer>
            <button [disabled]="reportForm.invalid || isSpinning" mat-flat-button color="accent">
              <div class="loader" *ngIf="isSpinning"></div>
              SUBMIT
            </button>
            <button mat-flat-button color="accent" (click)="cancel()">
              CANCEL
            </button>
          </mat-card-footer>
        </form>
      </mat-card-content>
    </mat-card>
  `
})
export class ReportComponent implements OnInit {

  subscriptions: Subscription[] = [];
  foundUserProfile: UserInterface
  currentUser: UserInterface;
  reportForm: FormGroup;
  isSpinning: boolean = false;



  constructor(
    private reportService: ReportService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private formResetterService: FormResetterService
  ) { }

  ngOnInit() {
    // get currrent user
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user) => {
        this.currentUser = user;
      })
    )
    
    // get found user
    this.subscriptions.push(
      this.reportService.getFoundUser.subscribe((foundUser: UserInterface) => {
        if (foundUser !== null) { // check if about has username property
          this.foundUserProfile = foundUser;
        } else {
          // return user if no user is set
          this.router.navigateByUrl(`dashboard/betcodes`);
          // this.router.navigateByUrl(`dashboard/`);
        }
      })
    )

    this.reportForm = new FormGroup({
      tellUsAboutUser: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}')
          ], updateOn: 'change'
      }),
      reportMsg: new FormControl('', {
        validators:
          [
            Validators.required,
            //Validators.pattern('[A-Za-z]{2,80}'),
          ], updateOn: 'change'
      }),
      reply: new FormControl(false),
    })

  }

  onSubmit(reportObj: ReportInterface) {
    this.isSpinning = true;

    reportObj['reporter'] = this.currentUser._id;
    reportObj['reportee'] = this.foundUserProfile._id;

    // push into list
    this.subscriptions.push(
      this.reportService.create(reportObj).subscribe((res) => {
        if (res.code === 200) {
          this.snackBar.open(`${res.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['success']
          });

          // reset form
          this.formResetterService.reset(this.reportForm);
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

  cancel() {
    this.router.navigateByUrl(`dashboard/${this.foundUserProfile.username}`);
  }

}
