import { Component, OnInit } from '@angular/core';
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
export class SportKnowledgeComponent extends PredictionStatusClass implements OnInit {

  knowledgeLevel: number = 50;

  constructor() { 
    super()
  }

  ngOnInit(): void {
    console
  }

  getBarColor () {
    return super.getProgressBarWidth(this.knowledgeLevel)
  }

}
