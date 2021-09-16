import { FootbalTeamInterface, MatchInterface } from "./tab.service";

export class TabClass {

    constructor() {
      //super();
    }

    // Round numbers up to one decimal places
    protected round(value: number): number {
        return Math.round(value * 100) / 100;
    }

    // Get Implied Probability
    protected getImpliedProbability(oddValue: number): number {
        if (this.round(oddValue) >= 0.01 ) {
            const impliedProbability: number = (1 / Number(oddValue)) //* 100;
            if (impliedProbability !== Infinity) return this.round(impliedProbability);
        }
        return null
    }

    // Set Progress Bar Width
    protected getProgressBarWidth(impliedProbabilityValue: number): any {
        // get odd implied probabilty
        if (impliedProbabilityValue >= 1) {
            if (impliedProbabilityValue >= 1 && impliedProbabilityValue <= 25 ) return { 'w-25': true };
            if (impliedProbabilityValue > 25 && impliedProbabilityValue <= 50 ) return { 'w-50': true };
            if (impliedProbabilityValue > 50 && impliedProbabilityValue <= 75 ) return { 'w-75': true };
            if (impliedProbabilityValue > 75 && impliedProbabilityValue <= 100 ) return { 'w-100': true };
        }
    }

    // Set Odd Grade/Strength
    protected getOddStrength(impliedProbabilityValue: number): any {
        // get odd implied probabilty
        if (impliedProbabilityValue >= 1) {
            if (impliedProbabilityValue >= 1 && impliedProbabilityValue <= 25 ) return 'Very low';
            if (impliedProbabilityValue > 25 && impliedProbabilityValue <= 50 ) return 'Low';
            if (impliedProbabilityValue > 50 && impliedProbabilityValue <= 75 ) return 'Normal';
            if (impliedProbabilityValue > 75 && impliedProbabilityValue <= 100 ) return 'High';
        }
    }

    // get all teams in a season
    getSeasonTeams(matches: MatchInterface[]): FootbalTeamInterface[] {
        const t: FootbalTeamInterface[] = [];
    
        matches.forEach((match) => {
          t.push(match.home_team)
          t.push(match.away_team)
        })
        // remove duplicate values
        return t.filter((v,i,a)=>a.findIndex(t=>(t.team_id === v.team_id))===i) //Find unique id's in an array.
    }

    // get head to head matches
    getHeadToHeadMatches(matches: MatchInterface[], homeTeamId: number, awayTeamId: number): MatchInterface[] {
        const m: MatchInterface[] = [];

        matches.forEach((match) => {
            if (match.home_team.team_id == homeTeamId && match.away_team.team_id == awayTeamId) {
                m.push(match)
            }
            if (match.home_team.team_id == awayTeamId && match.away_team.team_id == homeTeamId) {
                m.push(match)
            }
        })
        return m
    }

    // get all Home team matches played at home
    getAllHomeTeamMatchesPlayedHome(matches: MatchInterface[], homeTeamId: number): MatchInterface[]  {
        const m: MatchInterface[] = [];

        // loop through to find Home/Away team matches
        matches.forEach((match) => {
            // Home team matches
            if (match.home_team.team_id == homeTeamId) {
                m.push(match)
            }
        })
        return m;
    }

    // get all Away team matches played away
    getAllAwayTeamMatchesPlayedAway(matches: MatchInterface[], awayTeamId: number): MatchInterface[]  {
        const m: MatchInterface[] = [];

        // loop through to find Home/Away team matches
        matches.forEach((match) => {
            // Home team matches
            if (match.away_team.team_id == awayTeamId) {
                m.push(match)
            }
        })
        return m;
    }
}