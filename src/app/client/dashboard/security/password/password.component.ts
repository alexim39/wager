import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'async-password',
  template: `
    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
        </li>
        <li>
          <a [routerLink]="['/dashboard/security']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Security</a>
        </li>
        <li>password</li>
      </ul>
    </div>

    <section *ngIf="user" fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutGap="1rem" fxLayoutAlign="space-between start" >
      <async-change-password [user]="user" fxFlex="50"></async-change-password>
      <async-mfa [user]="user" fxFlex="50"></async-mfa>
    </section>
  `,
  styles: [``]
})
export class PasswordComponent implements OnInit, OnDestroy {

   // init subscriptions list
   subscriptions: Subscription[] = [];
   user: UserInterface;
   
  constructor(
    private userService: UserService,
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']); 
  }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    )
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

}
