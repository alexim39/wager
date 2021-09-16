import { TabClass } from '../../tab.class';
import { FootbalTeamInterface, MatchInterface, TabService } from '../../tab.service';

export class TeamsFormClass extends TabClass  {

    constructor() {
        super()
    }

    // home won matches
    homeWonMatches(matches: MatchInterface[]){
        let counter: number = 0;
        matches.forEach((match) => {
            if (match.stats.home_score > match.stats.away_score) {
                counter = counter + 1;
            }
        })
        return counter;
    }

    // home draw matches
    homeDrawMatches(matches: MatchInterface[]){
        let counter: number = 0;
        matches.forEach((match) => {
            if (match.stats.home_score == match.stats.away_score) {
                counter = counter + 1;
            }
        })
        return counter;
    }

    // home losed matched
    homeLosedMatches(matches: MatchInterface[]){
        let counter: number = 0;
        matches.forEach((match) => {
            if (match.stats.home_score < match.stats.away_score) {
                counter = counter + 1;
            }
        })
        return counter;
    }

    // away won matches
    awayWonMatches(matches: MatchInterface[]){
        let counter: number = 0;
        matches.forEach((match) => {
            if (match.stats.home_score < match.stats.away_score) {
                counter = counter + 1;
            }
        })
        return counter;
    }

    // away draw matches
    awayDrawMatches(matches: MatchInterface[]){
        let counter: number = 0;
        matches.forEach((match) => {
            if (match.stats.home_score == match.stats.away_score) {
                counter = counter + 1;
            }
        })
        return counter;
    }

    // away losed matched
    awayLosedMatches(matches: MatchInterface[]){
        let counter: number = 0;
        matches.forEach((match) => {
            if (match.stats.home_score > match.stats.away_score) {
                counter = counter + 1;
            }
        })
        return counter;
    }
}