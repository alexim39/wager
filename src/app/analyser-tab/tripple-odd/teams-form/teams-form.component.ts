import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { FootbalTeamInterface, MatchInterface, TabService } from '../../tab.service';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { TeamsFormClass } from './teams-form.class';
import { MatDialog } from '@angular/material/dialog';
import { SupposedOddDialogComponent } from './supposed-odd-dialog/supposed-odd-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthComponent } from 'src/app/auth/auth.component';
import { UserInterface, UserService } from 'src/app/core/user.service';
import { FormResetterService } from 'src/app/core/form-resetter.service';

@Component({
  selector: 'async-teams-form',
  templateUrl: './teams-form.component.html',
  styleUrls: ['./teams-form.component.scss', './teams-form.mobile.scss']
})
export class TeamsFormComponent extends TeamsFormClass implements OnInit, OnDestroy {

  // init subscriptions list
  subscriptions: Subscription[] = [];
  user: UserInterface;
  teamsForm: FormGroup;
  isSpinning: boolean = false;
  teams: FootbalTeamInterface[] = [];
  filteredHomeTeams: Observable<FootbalTeamInterface[]>;
  filteredAwayTeams: Observable<FootbalTeamInterface[]>;
  matches: MatchInterface[] = [];

  homeTeamName: string;
  awayTeamName: string;

  supposedHomeOdd: number;
  supposedDrawOdd: number;
  supposedAwayOdd: number;

  probabilityOfHomeWin: number;
  probabilityOfDrawWin: number;
  probabilityOfAwayWin: number;

  // init odd strength
  homeOddStrength: string;
  drawOddStrength: string;
  awayOddStrength: string;

  averageHomeWin: number;
  averageAwaywin: number;

  homeTeamHomeWinningChances: number;
  awayTeamAwayWinningChances: number;

  // init averageWin
  homeAverageWin: number;
  drawAverage: number;
  awayAverageWin: number;

  homeAverageGoals: number;
  awayAverageGoals: number;

  // access teams Id
  @ViewChild('homeTeamRefId') homeTeamRefId: ElementRef;
  @ViewChild('awayTeamRefId') awayTeamRefId: ElementRef;

  // bookmakers probability
  /* @Input() bookmakerProbabilityOfHomeWin: number;
  @Input() bookmakerProbabilityOfAwayWin: number;
  @Input() bookmakerProbabilityOfDrawWin: number; */

  // bookmakers probability
  /* @Input() bookmakerHomeOdd: number;
  @Input() bookmakerDrawOdd: number;
  @Input() bookmakerAwayOdd: number; */

  showAnalytics: boolean = false;

  constructor(
    private tabService: TabService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private userService: UserService,
    private formResetterService: FormResetterService,
  ) {
    super();
   }

  private _filter(value: string): FootbalTeamInterface[] {
    const filterValue = value.toLowerCase();

    return this.teams.filter(team => team.name.toLowerCase().includes(filterValue));
  }

  private fetchMatchesBySeason(seasonId: number = 496) {
    this.subscriptions.push(
      this.tabService.getMatchesBySeason(seasonId).subscribe((res) => {
        this.matches = res.data;
        
        // get all teams in current season
        this.teams = super.getSeasonTeams(this.matches)
      })
    )
  }

  ngOnInit(): void {

    // push into list
    this.subscriptions.push(
      this.userService.getUser().subscribe((user: UserInterface) => {
        this.user = user;
      })
    );

    this.teamsForm = new FormGroup({
      homeTeam: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_. ]{1,90}')
          ], updateOn: 'change'
      }),
      awayTeam: new FormControl('', {
        validators:
          [
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_. ]{1,90}')
          ], updateOn: 'change'
      })
    })

    
    // filter for home team
    this.filteredHomeTeams = this.teamsForm.controls.homeTeam.valueChanges.pipe(
      startWith(''),
      map((team => team ? this._filter(team) : this.teams.slice()))
    );

    // filter for away team
    this.filteredAwayTeams = this.teamsForm.controls.awayTeam.valueChanges.pipe(
      startWith(''),
      map((team => team ? this._filter(team) : this.teams.slice()))
    );

    // call fetchMatchesBySeason method
    this.fetchMatchesBySeason();
  }

  onSubmit(teamsObj: any) {
    this.isSpinning = true;
    this.showAnalytics = true;
  
    // check if team is selected
    /* if (this.homeTeamRef.nativeElement.value || this.awayTeamRef.nativeElement.value ) {
      this.snackBar.open(`You did not select a team`, `Close`, {
        duration: 8000,
        panelClass: ['error']
      });
      this.isSpinning = false;
      return;
    } else { */

      const homeTeamId: number = this.homeTeamRefId.nativeElement.value;
      const awayTeamId: number = this.awayTeamRefId.nativeElement.value;

      this.homeTeamName = teamsObj.homeTeam;
      this.awayTeamName = teamsObj.awayTeam;
    
      // splice matches to 17
      const homeMatchSplice = super.getAllHomeTeamMatchesPlayedHome(this.matches, homeTeamId).slice(0,17); //this will return elements in position 0 through 17.
      const awayMatchSplice = super.getAllAwayTeamMatchesPlayedAway(this.matches, awayTeamId).slice(0,17); //this will return elements in position 0 through 17.
  
      // home win price = home team win + away team lose
      const homePrice: number = super.homeWonMatches(homeMatchSplice) + super.awayLosedMatches(awayMatchSplice);
  
      // draw price = home team draws + away team draws
      const drawPrice: number = super.homeDrawMatches(homeMatchSplice) + super.awayDrawMatches(awayMatchSplice);
  
      // away price = home team lose + away team wins
      const awayPrice: number = super.homeLosedMatches(homeMatchSplice) + super.awayWonMatches(awayMatchSplice);
  
      // total matches played
      const totalMatches: number = 34; // homeMatchSplice: 15 + awayMatchSplice: 17
      const homePricePercentage: number = (homePrice / totalMatches) * 100;
      const drawPricePercentage: number = (drawPrice / totalMatches) * 100;
      const awayPricePercentage: number = (awayPrice / totalMatches) * 100;
  
      // supposed odds of team
      this.supposedHomeOdd = +(100 / homePricePercentage).toFixed(2);
      this.supposedDrawOdd = +(100 / drawPricePercentage).toFixed(2);
      this.supposedAwayOdd = +(100 / awayPricePercentage).toFixed(2); // cast to number
  
  
      const homeImpliedProbability = super.getImpliedProbability(this.supposedHomeOdd);
      const drawImpliedProbability = super.getImpliedProbability(this.supposedDrawOdd);
      const awayImpliedProbability = super.getImpliedProbability(this.supposedAwayOdd);
  
      // total sum of implied probability (chances of winning)
      const totalImpliedProbability: number = homeImpliedProbability + drawImpliedProbability + awayImpliedProbability;
  
      // probability of home win
      this.probabilityOfHomeWin = super.round((homeImpliedProbability / totalImpliedProbability) * 100);
      // probability of draw win
      this.probabilityOfDrawWin = super.round((drawImpliedProbability / totalImpliedProbability) * 100);
      // probability of away win
      this.probabilityOfAwayWin = super.round((awayImpliedProbability / totalImpliedProbability) * 100);
  
      // Home team home winning chances = number of home games won / total games played
      this.homeTeamHomeWinningChances = +(super.homeWonMatches(homeMatchSplice) / 17 * 100).toFixed(2);
      // Away team away winning chances = number of away games won / total games played
      this.awayTeamAwayWinningChances = +(super.awayWonMatches(awayMatchSplice) / 17 * 100).toFixed(2);
  
      // average winning out of 6 games
      this.averageHomeWin = Math.round(((this.homeTeamHomeWinningChances * 6) / 100));
      this.averageAwaywin = Math.round(((this.awayTeamAwayWinningChances * 6) / 100));
  
      // odd strength
      this.homeOddStrength = super.getOddStrength(this.probabilityOfHomeWin);
      this.drawOddStrength = super.getOddStrength(this.probabilityOfDrawWin);
      this.awayOddStrength = super.getOddStrength(this.probabilityOfAwayWin);
  
      // get average win (6 times play)
      this.homeAverageWin = Math.round((this.probabilityOfHomeWin * 6) / 100) * 10 / 10;
      this.drawAverage = Math.round((this.probabilityOfDrawWin * 6) / 100) * 10 / 10;
      this.awayAverageWin = Math.round((this.probabilityOfAwayWin * 6) / 100) * 10 / 10;
  
      // get average goals (over 2.5)
      //const drawAverageGoals: number = (this.probabilityOfDrawWin * 3) / 100
      const homeAverageGoals = (this.probabilityOfHomeWin * 3) / 100 //+ drawAverageGoals;
      const awayAverageGoals = (this.probabilityOfAwayWin * 3) / 100 //+ drawAverageGoals;
  
      this.homeAverageGoals = Math.round(homeAverageGoals) * 10 / 10;
      this.awayAverageGoals = Math.round(awayAverageGoals) * 10 / 10;
  
      this.isSpinning = false;

    //}
  }

  openSupposedOddDialog(oddValue: number, market: string): void {
    this.dialog.open(SupposedOddDialogComponent, {data: {oddValue, market, homeTeamName: this.homeTeamName, awayTeamName: this.awayTeamName }});
  }

  getHomeOddStrengthBar() {
    return super.getProgressBarWidth(this.probabilityOfHomeWin);
  }

  getDrawOddStrengthBar() {
    return super.getProgressBarWidth(this.probabilityOfDrawWin);
  }

  getAwayOddStrengthBar() {
    return super.getProgressBarWidth(this.probabilityOfAwayWin);
  }

  openAuthComponent() {
    this.dialog.open(AuthComponent);
  }

  ngOnDestroy(): void {
    // unsubscribe list
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  resetAnalytics (teamsForm: FormGroup) {
    this.showAnalytics = false;
    // reset form
    this.formResetterService.reset(teamsForm);
  }

}
