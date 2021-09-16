import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { MatchInterface } from 'src/app/analyser-tab/tab.service';
import { HeadToHeadClass } from './head-to-head.class';

@Component({
  selector: 'async-head-to-head',
  template: `
   <aside class="head-to-head">
     <div fxLayout="column" fxLayoutAlign="space-between center" fxLayoutGap="1em">
        <h3>Head To Head</h3>
        <p>Recent matches played between {{homeTeamName}} and {{awayTeamName}}</p>
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
            <tr *ngFor="let match of headToHeadMatches">
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
    </aside>
  `,
  styles: [`
    .head-to-head {
      div {
        padding-bottom: 1em;
        h3 {
          color: #010101;
        }
        p {
          padding-left: 1.1em;
          font-size: 0.8em;
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
    }
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
export class HeadToHeadComponent extends HeadToHeadClass implements OnInit {

  @Input() homeTeamName: string;
  @Input() awayTeamName: string;
  @Input() matches: MatchInterface[] = [];
  @Input() homeTeamRefId: ElementRef;
  @Input() awayTeamRefId: ElementRef;
  headToHeadMatches: MatchInterface[] = [];

  //displayedColumns: string[] = ['date', 'home', 'score', 'away'];

  constructor() {
    super()
  }

  ngOnInit(): void {
    const homeTeamId: number = this.homeTeamRefId.nativeElement.value;
    const awayTeamId: number = this.awayTeamRefId.nativeElement.value;

    // return sorted record
    this.headToHeadMatches = super.getHeadToHeadMatches(this.matches, homeTeamId, awayTeamId).sort((a: MatchInterface, b: MatchInterface) => { 
      return new Date(b.match_start).getTime()  - new Date(a.match_start).getTime()
    });
  }

  

}
