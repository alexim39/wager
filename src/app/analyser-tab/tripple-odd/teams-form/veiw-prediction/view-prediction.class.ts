import { TabClass } from '../../../tab.class';
//import { FootbalTeamInterface, MatchInterface, TabService } from '../../../tab.service';

export class ViewPredictionClass extends TabClass  {

    constructor() {
        super()
    }

    private randomlyGenerateMarket(): string {
        const words = [
            'DRAW', 
            'OVER 1.5', 
            'BOTH TEAMS TO SCORE', 
            //'Cat','Parrot','Iguana'
        ];
        return words[Math.floor(Math.random() * words.length)];
    }

    private randomlyGenerateOverAndUnderMarket(): string {
        const words = [
            'OVER 1.5', 
            'UNDER 4.5', 
            'OVER 2.5',
            'BOTH TEAMS TO SCORE'
        ];
        return words[Math.floor(Math.random() * words.length)];
    }

    favouriteTeam(homeTeamStrength: number, awayTeamStrength: number): number {
        if (homeTeamStrength > awayTeamStrength) {
            return 1;
        } else {
            return 2;
        }
    }

    private isDraw(probabilityOfHomeWin: number, probabilityOfAwayWin: number): boolean {
        if ( (probabilityOfHomeWin >= 25 && probabilityOfHomeWin <= 75) && (probabilityOfAwayWin >= 25 && probabilityOfAwayWin <= 75)) {
            return true;
        } else {

            //this.getOverAndUnder()
            return false;
        }
    }

    private checkDirectWin(teamStrength: number): boolean {
        if (teamStrength >= 75 && teamStrength <= 100) {
            return true;
        } else {
            return false;
        }
    }

    private checkDoubleChance(
        favouriteTeam: number, 
        homeTeamStrength: number, 
        awayTeamStrength: number,
        homeTeamName: string, 
        awayTeamName: string,
    ): string {
        if (favouriteTeam === 1) { // favourite is home

            if (homeTeamStrength >= 25 && homeTeamStrength <= 75) {
                return homeTeamName;
            } else {
                return null;
            }

        } else { // favourite is away
            
            if (awayTeamStrength >= 25 && awayTeamStrength <= 75) {
                return awayTeamName;
            } else {
                return null;
            }
        }
    }

    getOverAndUnder( probabilityOfHomeWin: number, probabilityOfAwayWin: number): string {
        if (!this.isDraw(probabilityOfHomeWin, probabilityOfAwayWin)) {
            return this.randomlyGenerateOverAndUnderMarket()
        } else {
            return null;
        }
    }

    getDoubleChanceTeam(
        favouriteTeam: number, 
        homeTeamName: string, 
        awayTeamName: string, 
        probabilityOfHomeWin: number, 
        probabilityOfAwayWin: number
    ): string {
        /* check if draw is posible */
        if (this.isDraw(probabilityOfHomeWin, probabilityOfAwayWin)) {
            return this.checkDoubleChance(favouriteTeam, probabilityOfHomeWin, probabilityOfAwayWin, homeTeamName, awayTeamName) + ' or ' + this.randomlyGenerateMarket();
        } else {
            return null
        }
    }

    getDirectWinTeam(favouriteTeam: number, homeTeamName: string, awayTeamName: string, probabilityOfHomeWin: number, probabilityOfAwayWin: number): string {
        // check if favarite team home
        if (favouriteTeam === 1) { // home team
            if (this.checkDirectWin(probabilityOfHomeWin)) {
                return homeTeamName;
            } else {
                return null
            }
        } else {
        // check if favarite team away
        // if (favouriteTeam === 2) { // home team
            if (this.checkDirectWin(probabilityOfAwayWin)) {
              return awayTeamName;
            } else {
                return null
            }
        }
    }
}