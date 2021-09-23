import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInterface } from 'src/app/core/user.service';
import { UserBetcodesAndProfileInterface } from '../../user-profile.service';
import { PredictionStatusClass } from '../prediction-status.class';

@Component({
  selector: 'async-sport-knowledge',  
  styles: [`
    div {
      padding: 1em;
      .status-title {
        color: gray;
        text-align: center;
      }
      .skill-bar {
        display: flex;
        align-content: center;
        align-items: center;
        mat-progress-bar {
          height: 20px;
        }
        .value {
          position: absolute; 
          padding: 10px 10px 10px 40px; 
          color: black;
          font-size: 10px;
          font-weight: bold;
        }
      }
    }
  `],
  template: `
    <div fxLayout="column" fxLayout.sm="column" fxLayoutGap="0.5em">
      <div class="skill-bar" fxLayout="row" fxLayoutGap="0.5em" matTooltip="{{knowledgeLevel}}% sport knowledge">
        <small>Low</small>
        <mat-progress-bar mode="determinate" [value]="knowledgeLevel" [ngClass]="getBarColor()"></mat-progress-bar>
        <small>High</small>
        <span class="value"> {{knowledgeLevel}}% </span>
      </div>
      <small class="status-title">Sport Knowledge</small>
    </div>
  `
})
export class SportKnowledgeComponent extends PredictionStatusClass implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];
  knowledgeLevel: number = 0;
  @Input() userBetcodesAndProfile: UserBetcodesAndProfileInterface[] = [];
  foundUserProfile: UserInterface;
  @Input() currentUser: UserInterface;
  followers: number = 0;
  winningValue: number = 0;


  constructor() { 
    super()
  }

  ngOnInit(): void {
    // found user
    this.foundUserProfile = this.userBetcodesAndProfile[0].creator;
    // user winning value
    this.winningValue = super.userWins(this.userBetcodesAndProfile);
    // set user followers
    this.followers = this.foundUserProfile.followers.length;

    //knwowledge
    this.setKnowledge()
  }


  /* 
    Algo:
    (winnings + followers) / 2 * 100
  */
  private setKnowledge(): void {
    this.knowledgeLevel = +( (this.winningValue/2) + (this.followers/2) ).toFixed(0);
  }


  getBarColor () {
    return super.getProgressBarWidth(this.knowledgeLevel)
  }

  ngOnDestroy() {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
        subscription.unsubscribe();
    });
  }

}
