import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { MatchInterface } from 'src/app/analyser-tab/tab.service';
import { RecentMatchesClass } from './resent-matches.class';

@Component({
  selector: 'async-resent-matches',
  template: `
    <aside class="recent-matches">
     <div fxLayout="row" fxLayoutAlign="space-between center" fxLayoutGap="1em" fxLayout.xs="column" fxLayout.sm="column">

        <div class="home-matches" fxFlex>
          <!-- <h3>Head To Head</h3> -->
          <p>{{homeTeamName}} Recent Home Matches</p>
          <table>
            <thead>
              <tr>
                <th>DATE</th>
                <th>HOME</th>
                <th>SCORE</th>
                <th>AWAY</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let match of homeTeamMatches">
                <td scope="row" data-label="DATE">{{match.match_start | date}} </td>
                <td data-label="HOME">
                  <img src="{{match.home_team.logo}}" alt="team logo">
                  {{match.home_team.name}}
                </td>
                <td data-label="SCORE">
                {{match.stats.home_score}} - {{match.stats.away_score}} 
                </td>
                <td data-label="AWAY">
                  <img src="{{match.away_team.logo}}" alt="team logo">
                  {{match.away_team.name}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="away-matches" fxFlex>
          <p>{{awayTeamName}} Recent Away Matches</p>
          <table>
            <thead>
              <tr>
                <th>DATE</th>
                <th>HOME</th>
                <th>SCORE</th>
                <th>AWAY</th>
              </tr>
            </thead>
            <tbody>
              <tr *ngFor="let match of awayTeamMatches">
                <td scope="row" data-label="DATE">{{match.match_start | date}} </td>
                <td data-label="HOME">
                  <img src="{{match.home_team.logo}}" alt="team logo">
                  {{match.home_team.name}}
                </td>
                <td data-label="SCORE">
                {{match.stats.home_score}} - {{match.stats.away_score}} 
                </td>
                <td data-label="AWAY">
                  <img src="{{match.away_team.logo}}" alt="team logo">
                  {{match.away_team.name}}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

     </div>
    </aside>
  `,
  styles: [`
    aside {
      margin-top: 2em;
      div {
        padding-bottom: 1em;
        .home-matches {
          h3 {
          color: #010101;
          }
          p {
            padding-left: 1.1em;
            font-size: 1em;
            color: gray;
          }
          table {
            background-color: white;
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            td, th {
              border: 1px solid whitesmoke;
              padding: 6px;
              text-align: center;
              img {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                margin-bottom: -5px;
              }
            }
          }
        }
        .away-matches {
          h3 {
            color: #010101;
          }
          p {
            padding-left: 1.1em;
            font-size: 1em;
            color: gray;
          }
          table {
            background-color: white;
            font-family: arial, sans-serif;
            border-collapse: collapse;
            width: 100%;
            overflow-x:auto;
            td, th {
            border: 1px solid whitesmoke;
            padding: 6px;
            text-align: center;
            img {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              margin-bottom: -5px;
            }
          }
          }
        }
      }
    }
    /* For tablets: */
    @media only screen and (max-width:800px) { 
      .home-matches, .away-matches {
        width: 100%;
      }
    }

    /* For mobile phones: */
    @media screen and (max-width: 500px) {
        table {
          border: 0;
        }
      
        table caption {
          font-size: 1.3em;
        }
        
        table thead {
          border: none;
          clip: rect(0 0 0 0);
          height: 1px;
          margin: -1px;
          overflow: hidden;
          padding: 0;
          position: absolute;
          width: 1px;
        }
        
        table tr {
          border-bottom: 3px solid #ddd;
          display: block;
          margin-bottom: .625em;
        }
        
        table td {
          border-bottom: 1px solid #ddd;
          display: block;
          font-size: .8em;
          text-align: right;
        }
        
        table td::before {
          /*
          * aria-label has no advantage, it won't be read inside a table
          content: attr(aria-label);
          */
          content: attr(data-label);
          float: left;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        table td:last-child {
          border-bottom: 0;
        }
    }
  `]
})
export class ResentMatchesComponent extends RecentMatchesClass implements OnInit {

  @Input() homeTeamName: string;
  @Input() awayTeamName: string;
  @Input() matches: MatchInterface[] = [];
  @Input() homeTeamRefId: ElementRef;
  @Input() awayTeamRefId: ElementRef;
  homeTeamMatches: MatchInterface[] = [];
  awayTeamMatches: MatchInterface[] = [];

  //displayedColumns: string[] = ['date', 'home', 'score', 'away'];

  constructor() {
    super()
  }

  ngOnInit(): void {
    const homeTeamId: number = this.homeTeamRefId.nativeElement.value;
    const awayTeamId: number = this.awayTeamRefId.nativeElement.value;

    const homeMatchSorted = super.getAllHomeTeamMatchesPlayedHome(this.matches, homeTeamId).sort((a: MatchInterface, b: MatchInterface) => { 
      return new Date(b.match_start).getTime()  - new Date(a.match_start).getTime()
    });

    const awayMatchSorted = super.getAllAwayTeamMatchesPlayedAway(this.matches, awayTeamId).sort((a: MatchInterface, b: MatchInterface) => { 
      return new Date(b.match_start).getTime()  - new Date(a.match_start).getTime()
    });

    // splice matches to 6
    this.homeTeamMatches = homeMatchSorted.slice(0,6); //this will return elements in position 0 through 6.
    this.awayTeamMatches = awayMatchSorted.slice(0,6); //this will return elements in position 0 through 6.
  }

}
