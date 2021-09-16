import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'async-about-app-dialog',
  template: `

    <div class="breadcrumb-wrap">
      <ul class="breadcrumb">
          <li>
          <a [routerLink]="['/']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">Home</a>
          </li>
          <li>
          <a [routerLink]="['/firm']" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">firm</a>
          </li>
          <li>about app</li>
      </ul>
    </div>

    <div class="about-app-wrapper">
      <h1 class="mat-h1">ABOUT WAGER</h1>
      <div class="body-1">
        <p>
        WAGER is a product of Async Solutions Limited. An IT start-up with the vision to provide easy-to-use software solutions that solves deep human problems.
        Wager is designed to assist users analyse games, and understand their chances in winning a bet.
        </p>
      </div>
      <br>

      <h1 class="mat-h1">HOW IT WORKS</h1>
      <div class="body-1">
        <p>
          Wager as a platform is easy to use. When you provide the teams, the system analyses the current form of each team in regards to each other and provide you with the winning chances,
          the strength for draw and winning, and the ability of each team to score using an average of 3 goals.
        </p>

        <p>
          Analysis are provided for 3 types of markets which are catgorised into single, double and tripple odds.
        </p>

        <p>
          <strong>Tripple odds</strong> are designed for games like football (1X2) with three options. Enter the home, and away teams and click the analyse button or press the enter key on the keyboard to get analysed result of the game.
        </p>

        <p>
          <strong>Double odds</strong> are designed for games like Tennis (12), Over/Under markets, etc. This type of markets only have two options. Enter the first/home and second/away odd values and click the analyse button or press the enter key on the keyboard to get analysed results for the game.
        </p>

        <p>
          <strong>Single odd</strong> category are meant to analyse a single odd value. Enter the single odd and click the analyse button or press the enter key on the keyboard to get the odd analysed.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .about-app-wrapper {
      margin-top: 5em;
      .body-1 {
        p {
          text-align: justify;
        }
      }
    }
    /* For tablets: */
    @media only screen and (max-width:800px) {
    }

    /* For mobile phones: */
    @media only screen and (max-width:500px) {
      .about-app-wrapper {
        margin-top: 2em;
      }
    }
  `]
})
export class AboutAppComponent {

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
  }



}
