import { BetcodesInterface } from '../../../betcodes/betcodes.service';

export class MonthlyProgressClass {

    constructor() {}

    currentMonthWinsPercentage(betcodes: BetcodesInterface[]): number {
        const currentMonthsCodes: BetcodesInterface[] = [];
        // get current month
        const currentMonth = new Date().getMonth();
        // get number of won bets
        const numberOfWonBets: BetcodesInterface[] = [];

        betcodes.forEach((betcode) => {
            // get the end month
            const endMonth = new Date(betcode.endDate).getMonth()

            // add betcode with current month into array
            if (currentMonth == endMonth) {
                currentMonthsCodes.push(betcode)
            }
        })

        // get the number of won bets for the current month
        currentMonthsCodes.forEach((code) => {
            if (code.outcome == 'won') {
                numberOfWonBets.push(code)
            }
        })
        // percentage of won games
        return (numberOfWonBets.length / currentMonthsCodes.length ) * 100;
    }

}