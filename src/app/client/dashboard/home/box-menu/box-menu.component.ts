import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';

@Component({
  selector: 'async-box-menu',
  styles: [`
    div { 
      margin-top: -2em; 
    }
    /* For tablet phones: */
    @media only screen and (max-width:800px) {
      div {
        section {
        width: 100%;
        }
        .last-card {
          margin-top: 3em;
        }
      }
    }
    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      div {
        section {
        width: 100%;
        }
        .last-card {
          margin-top: 3em;
        }
      }
    }
  `],
  template: `
    <div *ngIf="user" fxLayout="row" fxLayout.xs="column" fxLayout.sm="column" fxLayoutGap="1rem" fxLayoutAlign="space-between center">
      <section>
        <!-- <async-subscription-status [user]="user"></async-subscription-status> -->
      </section>
      <section class="last-card" fxFlex="50">
        <async-monthly-progress [user]="user"></async-monthly-progress>
      </section>
  </div>`
})
export class BoxMenuComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  user: UserInterface;

  constructor(
    private userService: UserService
  ) { }

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
