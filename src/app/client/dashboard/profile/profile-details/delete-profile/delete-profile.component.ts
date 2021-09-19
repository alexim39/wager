import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileDetailsInterface, ProfileDetailsService } from '../profile-details.service';
import { UserInterface } from 'src/app/core/user.service';

@Component({
  selector: 'async-delete-profile',
  template: `
    <mat-card class="delete-profile" fxLayout="row" fxLayout.lt-sm="column" fxLayoutAlign="start" fxlayoutGap="3rem">
      <button [disabled]="!isChecked" (click)="deleteProfile()" mat-flat-button color="warn">DELETE ACCOUNT</button>
      <mat-slide-toggle color="warn" [(ngModel)]="isChecked">I Want to delete my account</mat-slide-toggle>
    </mat-card>
  `,
  styles: [`
    .delete-profile {
      margin-top: 1rem;
      width: 98%;
      button {
        margin-right: 3rem;
      }
      mat-slide-toggle {
        margin-top: 0.5rem;
        font-family: monospace;
        color: rgb(185, 18, 18);
      }
    }

    @media (max-width: 800px) {
      .delete-profile {
        margin-top: 1rem;
        width: 98%;
        padding: 3rem;
        button {
          margin-right: 0;
          margin-bottom: 1rem;
        }
      }
    }
  `]
})
export class DeleteProfileComponent implements OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  @Input() user: UserInterface;
  isChecked = false;

  constructor(
    private snackBar: MatSnackBar,
    private route: Router,
    private profileDetailsService: ProfileDetailsService
  ) { }


  // delete profile
  deleteProfile() {
    const confirmDelete = confirm(`You are about to permanently delete your profile, by continuing you will loss access to your profile and all information you have in this platform`);
    if (confirmDelete) {

      // push into list
      this.subscriptions.push(
        this.profileDetailsService.deleteProfile(this.user._id).subscribe((res) => {
          if (res.code === 200) {
            this.snackBar.open(`${res.msg}`, `Close`, {
              duration: 4000,
              panelClass: ['success']
            });
            localStorage.removeItem('token')
            // sign user out
            setTimeout(() => {
              // redirect user to task list
              this.route.navigateByUrl(`/`);
            }, 4000);
          }
        }, (error) => {
          this.snackBar.open(`${error.error.msg}`, `Close`, {
            duration: 4000,
            panelClass: ['error']
          });
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
