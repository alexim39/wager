import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { UserBetcodesAndProfileInterface, UserProfileService } from '../user-profile.service';

@Component({
  selector: 'async-user-profile-home',
  template: `
    <section *ngIf="currentUser && userBetcodesAndProfile">
      <async-prediction-status [currentUser]="currentUser" [userBetcodesAndProfile]="userBetcodesAndProfile"></async-prediction-status>
      <async-rater [currentUser]="currentUser" [userBetcodesAndProfile]="userBetcodesAndProfile"></async-rater>
    </section>
  `,
  styles: [
  ]
})
export class UserProfileHomeComponent implements OnInit {

  subscriptions: Subscription[] = [];
  userBetcodesAndProfile: UserBetcodesAndProfileInterface[] = [];
  currentUser: UserInterface;


  constructor(
    private userService: UserService,
    public userProfileService: UserProfileService,
  ) { }



  ngOnInit(): void {
    this.subscriptions.push(
      this.userProfileService.sharedMessage.subscribe(message => this.userBetcodesAndProfile = message)
    )
    
    this.subscriptions.push(
      // get current user details from data service
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.currentUser = user;
      })
    )

  }


}
