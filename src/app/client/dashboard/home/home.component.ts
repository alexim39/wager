import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'async-home',
  template: `
    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
        <li>
          <a [routerLink]="['/dashboard']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Dashboard</a>
        </li>
        <li></li>
      </ul>
    </div>

    <section *ngIf="currentUser" class="main" fxLayout="column" fxLayoutGap="3rem">
      <async-account-activation></async-account-activation>
      <async-box-menu></async-box-menu>

      <div class="fab" matTooltip="Predict games">
        <a mat-fab matRipple color="accent" [routerLink]="['/dashboard/betcodes']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
          <mat-icon>batch_prediction</mat-icon>
        </a>
      </div>
    </section>
  `,
  styles: [`
    .fab {
      position: fixed;
      bottom: 30px;
      right: 30px; 
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  currentUser: UserInterface;

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
      this.userService.getUser().subscribe((user) => {
        this.currentUser = user;
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
