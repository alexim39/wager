import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../../../auth/auth.component';

@Component({
  selector: 'async-why-we-exist',
  styles: [`
    aside {
      padding: 5em;
      div {
        margin-bottom: 1em;
        display: flex;
        flex-direction: row;
        span {
          margin-left: 1em;
          color: #AD1457;
          font-family: Verdana;
          display: list-item;
          list-style-type: disc;
          list-style-position: inside;
        }
      }
      h1 {
        font-weight: bolder;
        text-align: justify;
      }
      small {
        text-align: justify;
      }
      button {
        margin-top: 2em;
      }
    }
  `],
  template: `
    <aside class="video" fxLayout="column" fxLayoutAlign="center center">
      <!-- Desktop -->
      <div fxHide fxShow.gt-xs>
        <span>Bet Analytics</span> 
        <span>Bet Codes</span>
        <span> Bet Investment</span>
      </div>
      <!-- Mobile -->
      <div fxHide fxShow.lt-sm>
        <span>Analytics</span> 
        <span>Codes</span>
        <span>Investment</span>
      </div>

      <h1>We believe you can accumulate wealth by gradual process through betting and we only exist because we want you to win</h1>

<!--  <div>Invest in stocks*, crypto and metals — all in one place. Open a free account in minutes and bet 24/7 with N500 only.</div>
 -->  <small>Use our analytics tools, use our analysed bet codes — all in one place. Open a free account in minutes and bet 24/7 with N500 only.</small>

      <button (click)="openAuthComponent()" mat-flat-button color="accent">GET STARTED</button>
    </aside>
  `
})
export class WhyWeExistComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console
  }

  openAuthComponent() {
    this.dialog.open(AuthComponent);
  }

}
