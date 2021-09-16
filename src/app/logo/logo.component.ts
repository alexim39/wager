import { Component } from '@angular/core';

@Component({
  selector: 'async-logo',
  template: `<a [routerLink]="['/']">
              <span>
                  <mat-icon>insert_chart_outlined</mat-icon>
                  WAGER
              </span>
            </a>
            `,
  styles: [`
    a {
      text-decoration: none;
      color: black;
      span {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        font-family: "Audiowide", sans-serif;
        mat-icon {
          font-size: 20px;
          margin-top: 6px;
          margin-right: -3px;
          color: white;
        }
      }
    }
  `]
})
export class LogoComponent {

  constructor() { }

}
